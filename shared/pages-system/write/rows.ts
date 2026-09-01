import { namedIn } from "../read/rows.ts"
import type { Raw } from "./held.ts"

const BREAK = "\n"

const MARK = String.fromCharCode(96)

export type Row = Readonly<Record<string, Raw | readonly Raw[]>>

export type Standing =
  | { readonly kind: "standing"; readonly text: string }
  | { readonly kind: "none" }
  | { readonly kind: "unreadable"; readonly why: string }

export type Composed =
  | { readonly kind: "composed"; readonly text: string }
  | { readonly kind: "refused"; readonly why: string }

type Stood = {
  readonly name: string | null
  readonly line: string
}

const quoted = (name: string): string => MARK + name + MARK

const refused = (why: string): Composed => ({ kind: "refused", why })

export const nameOf = (row: Row): string | null => namedIn(row)

const rowIn = (line: string): Row | null => {
  let held: unknown
  try {
    held = JSON.parse(line)
  } catch {
    return null
  }
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  return held as Row
}

const stoodIn = (text: string): readonly Stood[] | string => {
  const stood: Stood[] = []
  const named = new Set<string>()
  let from = 0
  let at = 0
  while (from < text.length) {
    const ends = text.indexOf(BREAK, from)
    const line = (ends < 0 ? text.slice(from) : text.slice(from, ends)).trim()
    from = ends < 0 ? text.length : ends + 1
    at += 1
    if (line === "") continue
    const row = rowIn(line)
    if (row === null) return `line ${at} is not one JSON object, so it names no row: ${line}`
    const name = nameOf(row)
    if (name !== null) {
      if (named.has(name))
        return `line ${at} names ${quoted(name)}, which a line above it already names`
      named.add(name)
    }
    stood.push({ name, line })
  }
  return stood
}

const standingIn = (standing: Standing): readonly Stood[] | string => {
  if (standing.kind === "none") return []
  if (standing.kind === "unreadable")
    return `what stands here could not be read, so nothing may stand over it: ${standing.why}`
  return stoodIn(standing.text)
}

const textOf = (lines: readonly string[]): string =>
  lines.length === 0 ? "" : lines.join(BREAK) + BREAK

export const rowsWith = (standing: Standing, rows: Iterable<Row>): Composed => {
  const stood = standingIn(standing)
  if (typeof stood === "string") return refused(stood)
  const lines: string[] = []
  const places = new Map<string, number>()
  for (const one of stood) {
    if (one.name !== null) places.set(one.name, lines.length)
    lines.push(one.line)
  }
  const written = new Set<string>()
  for (const row of rows) {
    const line = JSON.stringify(row)
    const name = nameOf(row)
    if (name === null) {
      lines.push(line)
      continue
    }
    if (written.has(name))
      return refused(`${quoted(name)} is given twice in one go, and only one could stand`)
    written.add(name)
    const place = places.get(name)
    if (place === undefined) lines.push(line)
    else lines[place] = line
  }
  return { kind: "composed", text: textOf(lines) }
}

export const rowsWithout = (standing: Standing, name: string): Composed => {
  const stood = standingIn(standing)
  if (typeof stood === "string") return refused(stood)
  const kept = stood.filter((one) => one.name !== name)
  if (kept.length === stood.length)
    return refused(`no row here names ${quoted(name)}, so there is nothing to take away`)
  return { kind: "composed", text: textOf(kept.map((one) => one.line)) }
}