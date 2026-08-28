import type { Kept, Raw } from "./held.ts"

export type Front =
  | { readonly kind: "text"; readonly text: string }
  | { readonly kind: "refused"; readonly why: string }

export type Entry = readonly [string, Kept]

export type Composing = {
  readonly pageType: string
  readonly id: string
  readonly seq?: number
  readonly entries: readonly Entry[]
  readonly body: string
}

const FENCE = "---\n"

const PAGE_TYPE = "page-type-slug"

const ID = "id"

const SEQ = "seq"

const EMPTY = "[]"

const ITEM = "  - "

const MARK = String.fromCharCode(96)

const UNSTATED = "holds a number no page can state"

const TAKEN = "stands in a place of its own and cannot be given among the rest"

const RESERVED: ReadonlySet<string> = new Set([PAGE_TYPE, ID, SEQ])

const PLAIN = /^\w[\w./-]*(?: [\w./-]+)*$/

const NUMERIC = /^[0-9]+(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/

const RADIX = /^0[xXoObB]/

const WORD = /^(?:true|false|null|y|n|yes|no|on|off)$/i

const refused = (why: string): Front => ({ kind: "refused", why })

const refusedAs = (key: string, why: string): Front => refused(MARK + key + MARK + " " + why)

const barely = (text: string): boolean =>
  PLAIN.test(text) && !NUMERIC.test(text) && !RADIX.test(text) && !WORD.test(text)

const spelled = (raw: Raw): string | null => {
  if (typeof raw === "boolean") return raw ? "true" : "false"
  if (typeof raw === "number") return Number.isFinite(raw) ? String(raw) : null
  return barely(raw) ? raw : JSON.stringify(raw)
}

const filled = (lines: string[], key: string, kept: Kept): Front | null => {
  if (kept.kind === "cleared") return null
  if (kept.kind === "refused") return refused(kept.why)
  const raw = kept.raw
  if (typeof raw !== "object") {
    const held = spelled(raw)
    if (held === null) return refusedAs(key, UNSTATED)
    lines.push(key + ": " + held + "\n")
    return null
  }
  if (raw.length === 0) {
    lines.push(key + ": " + EMPTY + "\n")
    return null
  }
  const items: string[] = []
  for (const one of raw) {
    const held = spelled(one)
    if (held === null) return refusedAs(key, UNSTATED)
    items.push(ITEM + held + "\n")
  }
  lines.push(key + ":\n")
  for (const one of items) lines.push(one)
  return null
}

export const frontOf = (composing: Composing): Front => {
  const head: Entry[] = [
    [PAGE_TYPE, { kind: "value", raw: composing.pageType }],
    [ID, { kind: "value", raw: composing.id }],
  ]
  if (composing.seq !== undefined) head.push([SEQ, { kind: "value", raw: composing.seq }])
  const lines: string[] = []
  for (const [key, kept] of head) {
    const why = filled(lines, key, kept)
    if (why !== null) return why
  }
  for (const [key, kept] of composing.entries) {
    if (RESERVED.has(key)) return refusedAs(key, TAKEN)
    const why = filled(lines, key, kept)
    if (why !== null) return why
  }
  return { kind: "text", text: FENCE + lines.join("") + FENCE + composing.body }
}
