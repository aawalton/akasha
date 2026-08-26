import type { Inline, Mark } from "./types.ts"
import type { ContentRule, TemplateSlot } from "./shape-types.ts"
import { checkScalar, describe, type Fault } from "./value.ts"

export const plain = (xs: readonly Inline[]): string => xs.map((x) => x.text).join("")

type Run = { kind: Inline["kind"]; start: number; end: number }
type Chars = { text: string; marks: readonly Mark[][]; runs: readonly Run[] }

function chars(xs: readonly Inline[]): Chars {
  const marks: Mark[][] = []
  const runs: Run[] = []
  let text = ""
  for (const x of xs) {
    const start = text.length
    for (const ch of x.text) { text += ch; marks.push([...x.marks]) }
    runs.push({ kind: x.kind, start, end: text.length })
  }
  return { text, marks, runs }
}

const carries = (c: Chars, from: number, to: number, m: Mark): boolean => {
  for (let i = from; i < to; i++) if (!c.marks[i]!.includes(m)) return false
  return to > from
}

const spansOneLink = (c: Chars, from: number, to: number): boolean =>
  c.runs.some((r) => r.kind === "link" && r.start === from && r.end === to)

function matchTemplate(c: Chars, slots: readonly TemplateSlot[], si: number, at: number): Fault | null | "no" {
  if (si === slots.length) return at === c.text.length ? null : "no"
  const slot = slots[si]!
  if (slot.slot === "literal") {
    if (c.text.startsWith(slot.text, at)) {
      const r = matchTemplate(c, slots, si + 1, at + slot.text.length)
      if (r !== "no") return r
    }
    return slot.optional ? matchTemplate(c, slots, si + 1, at) : "no"
  }
  for (let end = c.text.length; end > at; end--) {
    if (slot.mark !== null && !carries(c, at, end, slot.mark)) continue
    if (slot.mark !== null && end < c.text.length && c.marks[end]!.includes(slot.mark)) continue
    const body = c.text.slice(at, end)
    if (slot.value.type === "docref" && !spansOneLink(c, at, end)) continue
    if (checkScalar(body, slot.value) !== null) continue
    const r = matchTemplate(c, slots, si + 1, end)
    if (r !== "no") return r
  }
  if (slot.optional) return matchTemplate(c, slots, si + 1, at)
  const next = slots[si + 1]
  const stop = next !== undefined && next.slot === "literal" ? c.text.indexOf(next.text, at) : -1
  const held = c.text.slice(at, stop === -1 ? c.text.length : stop).trim()
  const fault = held === "" ? null : checkScalar(held, slot.value)
  if (fault !== null) return { expected: `\`${slot.name}\` to be ${fault.expected}`, measured: fault.measured }
  const wanted = slot.value.type === "docref" ? `a link to ${describe(slot.value)}` : describe(slot.value)
  return { expected: `\`${slot.name}\` to be ${wanted}`, measured: held === "" ? "nothing" : `\`${held}\`` }
}

export function checkContent(xs: readonly Inline[], rule: ContentRule): Fault | null {
  const text = plain(xs)
  if (typeof rule.maxChars === "number" && text.length > rule.maxChars)
    return { expected: `at most ${rule.maxChars} characters`, measured: `${text.length}` }
  if (rule.marks !== null) {
    const mr = rule.marks
    if ("every" in mr) {
      const m: Mark = mr.every
      if (xs.length === 0 || !xs.every((x) => x.marks.includes(m)))
        return { expected: `every character marked ${m}`, measured: "partly marked" }
    } else if (xs.some((x) => x.marks.includes(mr.without))) {
      return { expected: `nothing marked ${mr.without}`, measured: `${mr.without} text` }
    }
  }
  if (rule.lead !== null) {
    const head = xs[0]
    if (!head || !head.marks.includes(rule.lead.mark) || head.text !== rule.lead.text)
      return { expected: `a ${rule.lead.mark} lead reading ${rule.lead.text}`, measured: head ? `\`${head.text}\`` : "nothing" }
  }
  if (rule.template !== null) {
    const r = matchTemplate(chars(xs), rule.template, 0, 0)
    if (r === "no") return { expected: "the declared template", measured: `\`${text.slice(0, 48)}\`` }
    return r
  }
  return null
}
