import { plain } from "../document/content.ts"
import { HOLES_KEY } from "../document/holes.ts"
import { parse } from "../document/parse.ts"
import * as tokens from "../document/tokens.ts"
import type { Block, Section } from "../document/types.ts"
import type { BlockPart, Cardinality, Ceiling, Choice, ContentRule, HeadingMatch, PartDef, SectionPart } from "../document/shape-types.ts"
import { parseFrontmatter } from "../frontmatter.ts"
import { holeName, LADDER, lineRule, mapAt, RANKS, templateOf } from "../document/template.ts"

export function blockKey(heading: string): string {
  return heading.trim().toLowerCase().replace(/\s+/g, "-")
}

const REPEAT = /^(\d+)(?:-(\d+))?$/

const UNBOUNDED: Cardinality = { least: 0, max: Number.POSITIVE_INFINITY }

function boundOf(at: string, field: string, declared: unknown): { cardinality: Cardinality | null; why: string | null } {
  if (declared === undefined) return { cardinality: UNBOUNDED, why: null }
  const stated = mapAt(declared)[field]
  if (stated === undefined) return { cardinality: UNBOUNDED, why: null }
  if (typeof stated !== "string") return { cardinality: null, why: `\`${at}.${field}\` is not a count` }
  const found = REPEAT.exec(stated.trim())
  if (found === null)
    return { cardinality: null, why: `\`${at}.${field}: ${stated}\` is not a count or a range of counts` }
  const min = Number(found[1])
  const max = found[2] === undefined ? min : Number(found[2])
  if (max < min) return { cardinality: null, why: `\`${at}.${field}: ${stated}\` runs backwards` }
  return { cardinality: { least: min, max }, why: null }
}

function ceilingOf(key: string, declared: unknown): { maxChars: Ceiling | "contents" | null; why: string | null } {
  const stated = mapAt(declared)["max"]
  if (stated === undefined) return { maxChars: "contents", why: null }
  if (typeof stated !== "string") return { maxChars: null, why: `\`blocks.${key}.max\` is not a size rank` }
  const ceiling = LADDER.get(stated.trim().toLowerCase())
  if (ceiling === undefined)
    return { maxChars: null, why: `\`blocks.${key}.max: ${stated}\` names no rank on the ladder — ${RANKS}` }
  return { maxChars: ceiling, why: null }
}

function standingOf(key: string, declared: unknown): { cardinality: Cardinality | null; why: string | null } {
  if (mapAt(declared)["count"] === undefined) return { cardinality: tokens.once, why: null }
  return boundOf(`blocks.${key}`, "count", declared)
}

const shownRule = (rule: ContentRule): string =>
  JSON.stringify(rule, (_name, held: unknown) => (held instanceof RegExp ? String(held) : held))

function listPart(
  block: Extract<Block, { kind: "list" }>,
  at: string,
  key: string,
  declared: unknown,
  slots: Record<string, unknown>
): { part: BlockPart | null; why: string | null } {
  const no = (why: string): { part: null; why: string } => ({ part: null, why })
  const written = block.items
  const [first] = written
  if (first === undefined) return no(`${at} writes a list holding no item`)
  const { cardinality: repeat, why: counted } = boundOf(`blocks.${key}`, "repeat", declared)
  if (repeat === null) return no(counted!)
  const mayBeAbsent = mapAt(declared)["repeat"] !== undefined && repeat.least === 0
  const items: Cardinality = mayBeAbsent ? { least: 1, max: repeat.max } : repeat
  const item: ContentRule[] = []
  const child: ContentRule[] = []
  for (const one of written) {
    const { rule, why } = lineRule(one.content, slots)
    if (rule === null) return no(why!)
    if (item.some((each) => shownRule(each) === shownRule(rule)))
      return no(`${at} writes ${written.length} list items of one shape, and each item states a shape an item may take`)
    item.push(rule)
    const [nested, ...others] = one.children
    if (others.length > 0)
      return no(`${at} writes ${one.children.length} bullets under its item, and one states the shape every bullet holds`)
    if (nested === undefined) continue
    const { rule: beneath, why: under } = lineRule(nested.content, slots)
    if (beneath === null) return no(under!)
    child.push(beneath)
  }
  const base = {
    part: "block",
    block: "list",
    ordered: block.ordered,
    cardinality: mayBeAbsent ? tokens.optional : tokens.once,
    items,
    item,
  } as const
  if (child.length === 0) return { part: { ...base, children: null }, why: null }
  if (child.length !== written.length)
    return no(
      `${at} writes a bullet under ${child.length} of its ${written.length} list items, and either every shape ` +
        `an item may take carries one or none of them does`
    )
  const { cardinality: children, why: counting } = boundOf(`blocks.${key}`, "children", declared)
  if (children === null) return no(counting!)
  return { part: { ...base, children, child }, why: null }
}

export const NARROWS = "narrows"

function sectionPart(
  section: Section,
  blocks: Record<string, unknown>,
  slots: Record<string, unknown>,
  keys: Map<string, string | null>
): { part: SectionPart | null; why: string | null } {
  const no = (why: string): { part: null; why: string } => ({ part: null, why })
  const heading = plain(section.heading)
  const at = `\`${"#".repeat(section.level)} ${heading}\``
  if (heading === "") return no("a block stands above the first heading, and a shape is keyed by its headings")
  const hole = holeName(heading)
  const key = hole ?? blockKey(heading)
  if (keys.has(key)) return no(`${at} keys \`blocks.${key}\`, which a heading standing before it already keys`)
  const declared = blocks[key]
  const stated = mapAt(declared)[NARROWS]
  if (stated !== undefined && (typeof stated !== "string" || stated.trim() === ""))
    return no(`\`blocks.${key}.${NARROWS}\` names no page type, which is what a narrowing narrows`)
  keys.set(key, stated === undefined ? null : (stated as string).trim())
  const contains: PartDef[] = []
  const only = section.blocks[0]
  const paragraphs = section.blocks.filter((b): b is Extract<Block, { kind: "paragraph" }> => b.kind === "paragraph")
  if (section.blocks.length > 1 && paragraphs.length !== section.blocks.length)
    return no(`${at} holds ${section.blocks.length} blocks, and only paragraphs stand together under one heading`)
  const [alone, ...beside] = paragraphs
  if (alone !== undefined) {
    const { cardinality, why: counted } = boundOf(`blocks.${key}`, "repeat", declared)
    if (cardinality === null) return no(counted!)
    const counts = mapAt(declared)["repeat"] !== undefined
    for (const [index, paragraph] of paragraphs.entries()) {
      const { template, why } = templateOf(paragraph.content, slots)
      if (template === null) return no(why!)
      const [lead, ...rest] = template
      if (lead === undefined) return no(`${at} states a template holding nothing`)
      const last = index === paragraphs.length - 1
      contains.push({
        part: "block",
        block: "paragraph",
        cardinality: beside.length === 0 || (counts && last) ? cardinality : tokens.once,
        content: { maxChars: "slots", marks: null, lead: null, template: [lead, ...rest] },
      })
    }
  } else if (only !== undefined && only.kind === "list") {
    const { part, why } = listPart(only, at, key, declared, slots)
    if (part === null) return no(why!)
    contains.push(part)
  } else if (only !== undefined) {
    return no(`${at} holds a block that is neither a paragraph nor a list`)
  }
  for (const child of section.sections) {
    const { part, why } = sectionPart(child, blocks, slots, keys)
    if (part === null) return no(why!)
    contains.push(part)
  }
  const [first, ...others] = contains
  if (first === undefined) return no(`${at} declares nothing beneath it`)
  const { cardinality, why: standing } = standingOf(key, declared)
  if (cardinality === null) return no(standing!)
  const { maxChars, why: capped } = ceilingOf(key, declared)
  if (maxChars === null) return no(capped!)
  let match: HeadingMatch = { match: "literal", text: heading }
  if (hole !== null) {
    const { rule, why } = lineRule(section.heading, slots)
    if (rule === null) return no(why!)
    match = { match: "any", content: rule }
  }
  return {
    part: {
      part: "section",
      level: section.level,
      heading: match,
      maxChars,
      cardinality,
      contains: [first, ...others],
    },
    why: null,
  }
}

function choicesOf(
  declared: unknown,
  sections: readonly PartDef[]
): { choices: readonly Choice[] | null; why: string | null } {
  const no = (why: string): { choices: null; why: string } => ({ choices: null, why })
  if (declared === undefined) return { choices: [], why: null }
  if (declared === null || typeof declared !== "object" || Array.isArray(declared))
    return no(`\`choices:\` states no map of named choices`)
  const named = new Map<string, SectionPart>()
  for (const part of sections)
    if (part.part === "section" && part.heading.match === "literal") named.set(blockKey(part.heading.text), part)
  const declares = [...named.keys()].join(", ")
  const out: Choice[] = []
  for (const [name, stated] of Object.entries(declared as Record<string, unknown>)) {
    const at = `choices.${name}`
    const of = mapAt(stated)["of"]
    if (!Array.isArray(of) || of.some((one) => typeof one !== "string"))
      return no(`\`${at}.of\` is not a list of the sections the choice stands over`)
    const parts: SectionPart[] = []
    for (const heading of of as readonly string[]) {
      const part = named.get(blockKey(heading))
      if (part === undefined) return no(`\`${at}.of: ${heading}\` names no section this shape declares — ${declares}`)
      if (parts.includes(part))
        return no(`\`${at}.of\` names \`${heading}\` twice, and a choice counts each of its sections once`)
      parts.push(part)
    }
    const [first, second, ...rest] = parts
    if (first === undefined || second === undefined)
      return no(`\`${at}.of\` names ${parts.length}, and a choice stands over two sections or more`)
    if (mapAt(stated)["repeat"] === undefined)
      return no(`\`${at}\` states no \`repeat:\`, which is how many of its sections may stand`)
    const { cardinality, why } = boundOf(at, "repeat", stated)
    if (cardinality === null) return no(why!)
    out.push({ cardinality, of: [first, second, ...rest] })
  }
  return { choices: out, why: null }
}

const SHAPE_DECLARATION_HOLE = "template"

const FREE_TEXT_HOLE = "text"

function isLoneHole(sections: readonly Section[], hole: string): boolean {
  const [only, ...rest] = sections
  if (only === undefined || rest.length > 0 || only.sections.length > 0) return false
  if (plain(only.heading) !== "") return false
  const [block, ...more] = only.blocks
  if (block === undefined || more.length > 0 || block.kind !== "paragraph") return false
  const [node, ...others] = block.content
  if (node === undefined || others.length > 0 || node.kind !== "text" || node.marks.length > 0) return false
  return node.text === `{${hole}}`
}

export interface Level {
  readonly sections: readonly PartDef[]
  readonly choices: readonly Choice[]
  readonly keys: ReadonlyMap<string, string | null>
  readonly declaresShapes: boolean
  readonly holdsFreeText: boolean
  readonly bindsHoles: boolean
}

export function levelOf(relPath: string, text: string): { level: Level | null; why: string | null } {
  const fm = parseFrontmatter(text)
  if (fm.error !== null) return { level: null, why: `its frontmatter cannot be accounted for: ${fm.error}` }
  const blocks = mapAt(fm.fields.get("blocks"))
  const slots = mapAt(fm.fields.get("slots"))
  const bound = fm.fields.get(HOLES_KEY)
  if (bound !== undefined && bound !== "true")
    return {
      level: null,
      why:
        `\`${HOLES_KEY}: ${String(bound)}\` is not \`true\`, which is the whole of saying that every \`{name}\` ` +
        `in a page's body is one its \`${HOLES_KEY}:\` key lists`,
    }
  const bindsHoles = bound !== undefined
  const template = parse(text, relPath)
  const keys = new Map<string, string | null>()
  if (isLoneHole(template.sections, SHAPE_DECLARATION_HOLE))
    return {
      level: { sections: [], choices: [], keys, declaresShapes: true, holdsFreeText: false, bindsHoles },
      why: null,
    }
  if (isLoneHole(template.sections, FREE_TEXT_HOLE))
    return {
      level: { sections: [], choices: [], keys, declaresShapes: false, holdsFreeText: true, bindsHoles },
      why: null,
    }
  const sections: PartDef[] = []
  for (const section of template.sections) {
    const { part, why } = sectionPart(section, blocks, slots, keys)
    if (part === null) return { level: null, why }
    sections.push(part)
  }
  const { choices, why: chosen } = choicesOf(fm.fields.get("choices"), sections)
  if (choices === null) return { level: null, why: chosen }
  return { level: { sections, choices, keys, declaresShapes: false, holdsFreeText: false, bindsHoles }, why: null }
}
