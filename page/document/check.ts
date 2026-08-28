import type { Block, Document, Inline, ListItem, Refusal, Section, Span, Verdict } from "./types.ts"
import type {
  BlockPart, Cardinality, Choice, CompiledShape, ContentRule, KeyPart, ListPart, PartDef,
  ProsePart, SectionPart,
} from "./shape-types.ts"
import { checkContent, plain } from "./content.ts"
import { HOLES_KEY, holeFaults } from "./holes.ts"
import type { Fault } from "./value.ts"
import { checkValue } from "./value.ts"

export type Resolve = (name: string) => CompiledShape | null

type Ctx = { path: string; compiled: CompiledShape; doc: Document; out: Refusal[]; seen: Set<string> }

const say = (c: Ctx, span: Span, part: string, expected: string, measured: string) =>
  c.out.push({ path: c.path, span, part, expected, measured })

const headingText = (s: Section): string => plain(s.heading)

const atLeast = (least: number): string => (least === 1 ? "one" : `at least ${least}`)

function countRefusal(c: Ctx, span: Span, part: string, n: number, card: Cardinality) {
  if (n < card.least) return say(c, span, part, atLeast(card.least), n === 0 ? "none" : `${n}`)
  if (n > card.max) return say(c, span, part, `at most ${card.max}`, `${n}`)
}

function checkKey(c: Ctx, doc: Document, part: KeyPart) {
  const declared = doc.frontmatter.filter((k) => k.name === part.name)
  const name = `\`${part.name}:\``
  if (declared.length === 0) {
    if (part.cardinality.least > 0) say(c, doc.span, name, "the key", "nothing")
    return
  }
  const max = part.cardinality.max
  if (declared.length > max) {
    const at = (declared[1] ?? declared[0]!).span
    return say(c, at, name, max === 0 ? "no such key" : `at most ${max}`, `${declared.length}`)
  }
  const fault = checkValue(declared[0]!.value, part.value)
  if (fault) say(c, declared[0]!.span, name, fault.expected, fault.measured)
}

function matches(part: SectionPart, s: Section): boolean {
  if (s.level !== part.level) return false
  return part.heading.match === "literal" ? headingText(s) === part.heading.text : true
}

const named = (p: PartDef): string =>
  p.part === "key"
    ? `\`${p.name}:\``
    : p.part === "section" && p.heading.match === "literal"
      ? `\`# ${p.heading.text}\``
      : "a part"

const stands = (c: Ctx, p: PartDef): boolean =>
  p.part === "key"
    ? c.doc.frontmatter.some((k) => k.name === p.name)
    : p.part === "section"
      ? c.doc.sections.some((s) => matches(p, s))
      : false

function checkChoice(c: Ctx, choice: Choice) {
  const n = choice.of.filter((p) => stands(c, p)).length
  countRefusal(c, c.doc.span, choice.of.map(named).join(" or "), n, choice.cardinality)
}

function expand(c: Ctx, parts: readonly PartDef[]): PartDef[] {
  const out: PartDef[] = []
  for (const p of parts) {
    if (p.part !== "ref") { out.push(p); continue }
    if (c.seen.has(p.fragment)) continue
    const frag = c.compiled.fragments[p.fragment]
    if (!frag) { out.push(p); continue }
    c.seen.add(p.fragment)
    out.push(...expand(c, frag.parts))
    c.seen.delete(p.fragment)
  }
  return out
}

function sameShape(c: Ctx, part: string, items: readonly ListItem[], rules: readonly ContentRule[]) {
  if (items.length === 0 || rules.length === 0) return
  const missed = (faults: readonly (Fault | null)[]): number => faults.filter((f) => f !== null).length
  const shapes = rules.map((rule) => items.map((item) => checkContent(item.content, rule)))
  const nearest = shapes.reduce((best, faults) => (missed(faults) < missed(best) ? faults : best))
  if (missed(nearest) === 0) return
  items.forEach((item, at) => {
    const fault = nearest[at]
    if (fault !== null && fault !== undefined) say(c, item.span, part, fault.expected, fault.measured)
  })
}

function checkBlocks(c: Ctx, host: Section, parts: readonly BlockPart[]) {
  const proseParts = parts.filter((p): p is ProsePart => p.block !== "list")
  const paragraphs = host.blocks.filter((b) => b.kind === "paragraph")
  let i = 0
  for (const part of proseParts) {
    const left = paragraphs.length - i
    const take = Math.min(part.cardinality.max, left)
    if (take < part.cardinality.least)
      say(c, host.span, "a paragraph", atLeast(part.cardinality.least), take === 0 ? "none" : `${take}`)
    for (let n = 0; n < take; n += 1) {
      const got = paragraphs[i]!
      const fault = checkContent(got.content as readonly Inline[], part.content)
      if (fault) say(c, got.span, "a paragraph", fault.expected, fault.measured)
      i += 1
    }
  }
  if (parts.length > 0 && i < paragraphs.length)
    say(c, paragraphs[i]!.span, "paragraphs", `at most ${i}`, `${paragraphs.length}`)
  for (const part of parts.filter((p): p is ListPart => p.block === "list")) {
    const lists = host.blocks.filter((b) => b.kind === "list")
    countRefusal(c, host.span, "a list", lists.length, part.cardinality)
    for (const list of lists) {
      if (list.ordered !== part.ordered)
        say(c, list.span, "a list", part.ordered ? "numbered" : "bulleted", list.ordered ? "numbered" : "bulleted")
      countRefusal(c, list.span, "list items", list.items.length, part.items)
      for (const item of list.items) {
        if (part.children === null) {
          if (item.children.length > 0)
            say(c, item.span, "a list item", "no nested items", `${item.children.length}`)
        } else {
          countRefusal(c, item.span, "nested items", item.children.length, part.children)
          sameShape(c, "a nested item", item.children, part.child)
        }
      }
      sameShape(c, "a list item", list.items, part.item)
    }
  }
}

const itemChars = (it: ListItem): number =>
  plain(it.content).length + it.children.reduce((n, k) => n + itemChars(k), 0)

function blockChars(b: Block): number {
  switch (b.kind) {
    case "paragraph": return plain(b.content).length
    case "list": return b.items.reduce((n, it) => n + itemChars(it), 0)
    case "fence": return b.text.length
    case "table": return [b.header, ...b.rows].reduce((n, row) => n + row.reduce((m, cell) => m + plain(cell).length, 0), 0)
  }
}

const sectionChars = (s: Section): number =>
  s.blocks.reduce((n, b) => n + blockChars(b), 0) +
  s.sections.reduce((n, k) => n + plain(k.heading).length + sectionChars(k), 0)

function checkSections(c: Ctx, host: { sections: readonly Section[]; span: Span }, parts: readonly PartDef[]) {
  for (const part of expand(c, parts)) {
    if (part.part === "ref") { say(c, host.span, `fragment \`${part.fragment}\``, "a known fragment", "none"); continue }
    if (part.part === "key" || part.part === "block") continue
    const found = host.sections.filter((s) => matches(part, s))
    const label = part.heading.match === "literal" ? `\`# ${part.heading.text}\`` : `a level-${part.level} section`
    countRefusal(c, host.span, label, found.length, part.cardinality)
    for (const s of found) {
      if (part.heading.match === "any") {
        const fault = checkContent(s.heading, part.heading.content)
        if (fault) say(c, s.span, `${label} heading`, fault.expected, fault.measured)
      }
      if (typeof part.maxChars === "number") {
        const size = sectionChars(s)
        if (size > part.maxChars) say(c, s.span, label, `at most ${part.maxChars} characters`, `${size}`)
      }
      const inner = expand(c, part.contains)
      if (part.maxChars === "contents" && !inner.some((p) => p.part === "section"))
        for (const k of s.sections)
          say(c, k.span, label, "no sub-sections", `\`${"#".repeat(k.level)} ${headingText(k)}\``)
      checkBlocks(c, s, inner.filter((p): p is BlockPart => p.part === "block"))
      checkSections(c, s, part.contains)
    }
  }
}

function checkNarrowing(c: Ctx, parent: CompiledShape) {
  for (const own of c.compiled.frontmatter) {
    const up = parent.frontmatter.find((k) => k.name === own.name)
    if (!up) continue
    if (own.cardinality.max > up.cardinality.max)
      say(c, { start: { line: 0, column: 0, offset: 0 }, end: { line: 0, column: 0, offset: 0 } },
        `\`${own.name}:\` against ${parent.domain}`, `at most ${up.cardinality.max}`, `${own.cardinality.max}`)
  }
}

function checkOrder(c: Ctx, sections: readonly Section[], ordered: readonly string[]) {
  let held = -1
  let above = ""
  for (const section of sections) {
    if (section.level !== 1) continue
    const text = headingText(section)
    const rank = ordered.indexOf(text)
    if (rank === -1) continue
    if (rank < held) say(c, section.span, `\`# ${text}\``, `above \`# ${above}\``, "below it")
    else {
      held = rank
      above = text
    }
  }
}

const countParts = (parts: readonly PartDef[]): number =>
  parts.reduce((n, p) => n + 1 + (p.part === "section" ? countParts(p.contains) : 0), 0)

export function check(doc: Document, compiled: CompiledShape, resolve: Resolve): Verdict {
  const c: Ctx = { path: doc.path, compiled: compiled, doc, out: [], seen: new Set() }
  for (const span of doc.unreadable)
    say(c, span, "a frontmatter line", "a key, a list item, or part of one", "a line the reader cannot account for")
  const seenShapes = new Set<string>()
  const admittedKeys = new Set<string>()
  const admittedSections = new Set<string>()
  const orderedSections: string[] = []
  let anyHeadingAdmitted = false
  const walk = (s: CompiledShape) => {
    if (seenShapes.has(s.domain)) return
    seenShapes.add(s.domain)
    for (const name of s.extends) {
      const parent = resolve(name)
      if (!parent) { say(c, doc.span, `\`extends: ${name}\``, "a known shape", "none"); continue }
      checkNarrowing({ ...c, compiled: s }, parent)
      walk(parent)
    }
    for (const key of s.frontmatter) {
      admittedKeys.add(key.name)
      checkKey(c, doc, key)
    }
    for (const part of s.sections) {
      if (part.part !== "section" || part.level !== 1) continue
      if (part.heading.match !== "literal") { anyHeadingAdmitted = true; continue }
      if (!admittedSections.has(part.heading.text)) orderedSections.push(part.heading.text)
      admittedSections.add(part.heading.text)
    }
    checkSections({ ...c, compiled: s }, doc, s.sections)
    for (const choice of s.choices ?? []) checkChoice({ ...c, compiled: s }, choice)
  }
  walk(compiled)
  for (const key of doc.frontmatter)
    if (!admittedKeys.has(key.name))
      say(c, key.span, "a frontmatter key", "one the shape names", `\`${key.name}:\``)
  if (admittedKeys.has(HOLES_KEY))
    for (const f of holeFaults(doc)) say(c, f.span, f.part, f.expected, f.measured)
  if (!anyHeadingAdmitted) {
    for (const section of doc.sections)
      if (section.level === 1 && !admittedSections.has(headingText(section)))
        say(c, section.span, "a section", "one the shape names", `\`# ${headingText(section)}\``)
    checkOrder(c, doc.sections, orderedSections)
  }
  const parts = compiled.frontmatter.length + countParts(compiled.sections) + (compiled.choices?.length ?? 0)
  return c.out.length === 0 ? { ok: true, path: doc.path, parts } : { ok: false, path: doc.path, refusals: c.out }
}
