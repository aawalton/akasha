import { everyOfType } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { valueAt } from "../../../pages-system/page/page-value/page-value.module.code.ts"
import {
  type Changing,
  type Knowing,
  standingOf,
  type Warrant,
} from "../../warranting/warranting.module.code.ts"

const TERM = "taboo-term"

const TEXT = new TextDecoder()

const JUDGE = "Read what it bars, then judge for yourself whether you meant a sense it bars."

export type Sense = {
  readonly sense: string
  readonly instead: string
}

export type Term = {
  readonly path: string
  readonly pattern: string
  readonly senses: readonly Sense[]
}

export function owedOf(senses: readonly Sense[]): string {
  return [
    "Your change writes a taboo term.",
    ...senses.map((one) => `  ${one.sense} — write ${one.instead} instead`),
    JUDGE,
  ].join("\n")
}

export function addedIn(before: string, after: string): string {
  const held = new Map<string, number>()
  for (const line of before.split("\n")) held.set(line, (held.get(line) ?? 0) + 1)
  const said: string[] = []
  for (const line of after.split("\n")) {
    const left = held.get(line) ?? 0
    if (left > 0) held.set(line, left - 1)
    else said.push(line)
  }
  return said.join("\n")
}

export function foundIn(pattern: string, added: string): boolean {
  try {
    return new RegExp(pattern, "gi").test(added)
  } catch {
    return false
  }
}

function sensesOf(said: unknown): readonly Sense[] {
  if (!Array.isArray(said)) return []
  return said.flatMap((one) => {
    if (one === null || typeof one !== "object") return []
    const row = one as Record<string, unknown>
    const sense = row["sense"]
    const instead = row["instead"]
    if (typeof sense !== "string" || typeof instead !== "string") return []
    return [{ sense, instead }]
  })
}

export function termsIn(root: string): readonly Term[] {
  const found: Term[] = []
  for (const standing of everyOfType(root, TERM)) {
    const value = valueAt(standing.path, root)
    if (value === null) continue
    const pattern = value["pattern"]
    if (typeof pattern !== "string") continue
    const senses = sensesOf(value["tabooSenses"])
    if (senses.length === 0) continue
    found.push({ path: standing.path, pattern, senses })
  }
  return found
}

function textOf(body: Uint8Array | null): string {
  return body === null ? "" : TEXT.decode(body)
}

export function changeTabooTerms(
  root: string,
  path: string,
  _knowing: Knowing,
  changing?: Changing
): readonly Warrant[] {
  if (changing === undefined) return []
  const added = addedIn(textOf(changing.before(path)), textOf(changing.after(path)))
  if (added.trim() === "") return []
  const found: Warrant[] = []
  for (const term of termsIn(root)) {
    if (term.path === path) continue
    if (!foundIn(term.pattern, added)) continue
    const oid = standingOf(root, term.path)
    if (oid === null) continue
    found.push({ path: term.path, oid, owed: owedOf(term.senses) })
  }
  return found
}
