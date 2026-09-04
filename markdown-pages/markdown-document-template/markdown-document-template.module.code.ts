import type { Inline, Mark } from "@akasha/pages-system/markdown-document"
import type {
  Ceiling,
  ContentRule,
  MarkRule,
  TemplateSlot,
  ValueType,
} from "../markdown-document-shape/markdown-document-shape.module.code.ts"
import * as tokens from "../markdown-document-tokens/markdown-document-tokens.module.code.ts"

const HOLE = /\{([a-z][a-z0-9-]*)\}/g

const ONE_HOLE = /^\{([a-z][a-z0-9-]*)\}$/

export const BACKSTOP = /^[1-9]\d*$/

const RUNG = "SIZE_"

export const LADDER: ReadonlyMap<string, Ceiling> = new Map(
  Object.entries(tokens as Record<string, unknown>).flatMap(([name, value]) =>
    name.startsWith(RUNG) && typeof value === "number"
      ? [[name.slice(RUNG.length).toLowerCase(), value as Ceiling] as const]
      : []
  )
)

export const RANKS = [...LADDER.keys()].join(", ")

export function holeName(text: string): string | null {
  return ONE_HOLE.exec(text)?.[1] ?? null
}

export function mapAt(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {}
}

export type Shaped = Extract<ValueType, { type: "pattern" }>

export function expressionOf(
  where: string,
  pattern: unknown,
  backstop: unknown
): { expression: Shaped | null; why: string | null } {
  const no = (why: string): { expression: null; why: string } => ({ expression: null, why })
  if (typeof pattern !== "string" || pattern.trim() === "")
    return no(`\`${where}pattern\` states no expression`)
  if (typeof backstop !== "string" || !BACKSTOP.test(backstop.trim()))
    return no(
      `\`${where}pattern\` states an expression and \`${where}backstop\` states no count of characters beside it, ` +
        `which is how far the expression may run`
    )
  try {
    const expression = new RegExp(pattern.trim())
    return {
      expression: { type: "pattern", pattern: expression, backstop: Number(backstop.trim()) },
      why: null,
    }
  } catch (thrown) {
    const said = thrown instanceof Error ? thrown.message : String(thrown)
    return no(`\`${where}pattern: ${pattern}\` is no expression this can read: ${said}`)
  }
}

function slotValue(
  name: string,
  declared: unknown
): { value: ValueType | null; why: string | null } {
  const no = (why: string): { value: null; why: string } => ({ value: null, why })
  if (declared === undefined) return no(`\`slots:\` declares nothing for \`{${name}}\``)
  const decl = mapAt(declared)
  const values = decl["values"]
  if (values !== undefined) {
    if (
      !Array.isArray(values) ||
      values.length === 0 ||
      values.some((one) => typeof one !== "string")
    )
      return no(`\`slots.${name}.values\` is not a list of values`)
    return { value: { type: "enum", values: values as string[] }, why: null }
  }
  const to = decl["to"]
  if (to !== undefined) {
    if (to !== "path")
      return no(`\`slots.${name}.to: ${String(to)}\` names no way to resolve a link — path`)
    return { value: { type: "docref", to: { resolve: "path" } }, why: null }
  }
  const pattern = decl["pattern"]
  if (pattern !== undefined) {
    const { expression, why } = expressionOf(`slots.${name}.`, pattern, decl["backstop"])
    if (expression === null) return no(why!)
    return { value: expression, why: null }
  }
  const max = decl["max"]
  if (max !== undefined) {
    if (typeof max !== "string") return no(`\`slots.${name}.max\` is not a size rank`)
    const ceiling = LADDER.get(max.trim().toLowerCase())
    if (ceiling === undefined)
      return no(`\`slots.${name}.max: ${max}\` names no rank on the ladder — ${RANKS}`)
    return { value: { type: "text", maxChars: ceiling }, why: null }
  }
  return no(`\`slots.${name}\` declares none of \`values:\`, \`to:\`, \`pattern:\` or \`max:\``)
}

const MARKS: readonly Mark[] = ["strong", "em", "code"]

const NAMED_MARKS = MARKS.map((one) => `\`${one}\``).join(", ")

export function barOf(
  name: string,
  declared: unknown
): { bar: MarkRule | null; why: string | null } {
  const stated = mapAt(declared)["without"]
  if (stated === undefined) return { bar: null, why: null }
  const found = typeof stated === "string" ? MARKS.find((one) => one === stated.trim()) : undefined
  if (found === undefined)
    return {
      bar: null,
      why: `\`slots.${name}.without: ${String(stated)}\` names no mark — ${NAMED_MARKS}`,
    }
  return { bar: { without: found }, why: null }
}

function linkSlot(
  node: Extract<Inline, { kind: "link" }>,
  slots: Record<string, unknown>
): { slot: TemplateSlot | null; why: string | null } {
  const no = (why: string): { slot: null; why: string } => ({ slot: null, why })
  const name = holeName(node.text)
  if (name === null || holeName(node.href) === null)
    return no(
      `\`[${node.text}](${node.href})\` is a link, and a link in a template is \`[{name}]({href})\``
    )
  const { value, why } = slotValue(name, slots[name])
  if (value === null) return no(why!)
  if (value.type !== "docref")
    return no(
      `\`{${name}}\` stands as a link, so \`slots.${name}\` states \`to:\` rather than a bound on its text`
    )
  return {
    slot: { slot: "hole", name, value, mark: node.marks[0] ?? null, optional: false },
    why: null,
  }
}

export function templateOf(
  content: readonly Inline[],
  slots: Record<string, unknown>
): { template: readonly TemplateSlot[] | null; why: string | null } {
  const out: TemplateSlot[] = []
  for (const node of content) {
    if (node.kind === "link") {
      const { slot, why } = linkSlot(node, slots)
      if (slot === null) return { template: null, why }
      out.push(slot)
      continue
    }
    const mark = node.marks[0] ?? null
    let at = 0
    for (const found of node.text.matchAll(HOLE)) {
      const before = node.text.slice(at, found.index)
      if (before !== "") out.push({ slot: "literal", text: before, optional: false })
      const name = found[1]!
      const { value, why } = slotValue(name, slots[name])
      if (value === null) return { template: null, why }
      out.push({ slot: "hole", name, value, mark, optional: false })
      at = found.index + found[0].length
    }
    const rest = node.text.slice(at)
    if (rest !== "") out.push({ slot: "literal", text: rest, optional: false })
  }
  if (out.length === 0) return { template: null, why: "a paragraph in the template holds nothing" }
  return { template: out, why: null }
}

function soleCeiling(template: readonly TemplateSlot[]): Ceiling | null {
  const [only, ...rest] = template
  if (only === undefined || rest.length > 0) return null
  if (only.slot !== "hole" || only.value.type !== "text") return null
  return only.value.maxChars
}

function barsIn(
  template: readonly TemplateSlot[],
  slots: Record<string, unknown>
): { barred: readonly { name: string; bar: MarkRule }[] | null; why: string | null } {
  const barred: { name: string; bar: MarkRule }[] = []
  for (const slot of template) {
    if (slot.slot !== "hole") continue
    const { bar, why } = barOf(slot.name, slots[slot.name])
    if (why !== null) return { barred: null, why }
    if (bar !== null) barred.push({ name: slot.name, bar })
  }
  return { barred, why: null }
}

export function lineRule(
  content: readonly Inline[],
  slots: Record<string, unknown>
): { rule: ContentRule | null; why: string | null } {
  const no = (why: string): { rule: null; why: string } => ({ rule: null, why })
  const { template, why } = templateOf(content, slots)
  if (template === null) return { rule: null, why }
  const [lead, ...rest] = template
  if (lead === undefined) return no("a line in the template holds nothing")
  const { barred, why: unread } = barsIn(template, slots)
  if (barred === null) return no(unread!)
  const ceiling = soleCeiling(template)
  const [only, ...also] = barred
  if (only !== undefined) {
    const at = `\`slots.${only.name}.without\``
    const fills = `\`{${only.name}}\``
    if (also.length > 0)
      return no(
        `${at} and ${also.map((one) => `\`slots.${one.name}.without\``).join(" and ")} each bar a mark ` +
          `from the whole line the hole fills, and one line carries one bar`
      )
    if (rest.length > 0)
      return no(
        `${at} bars a mark from the whole line ${fills} fills, and ${fills} stands beside other text on it`
      )
    if (lead.slot === "hole" && lead.mark !== null)
      return no(
        `${at} bars a mark from the line ${fills} fills, and ${fills} is written marked in the template`
      )
    if (ceiling === null)
      return no(
        `${at} bars a mark from the line ${fills} fills, and \`slots.${only.name}\` bounds no text with \`max:\``
      )
    return { rule: { maxChars: ceiling, marks: only.bar, lead: null, template: null }, why: null }
  }
  if (ceiling === null)
    return {
      rule: { maxChars: "slots", marks: null, lead: null, template: [lead, ...rest] },
      why: null,
    }
  const marked = lead.slot === "hole" && lead.mark !== null
  return {
    rule: { maxChars: ceiling, marks: null, lead: null, template: marked ? [lead] : null },
    why: null,
  }
}
