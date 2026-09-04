import { everyOfType } from "@akasha/indexes"
import { partedIn } from "@akasha/pages-system/page-file-name"
import { valueAt } from "@akasha/pages-system/page-value"
import {
  blobAt,
  type Changing,
  type Knowing,
  type Warrant,
} from "../../warranting/warranting.module.code.ts"

const TERM = "taboo-term"

const PAGE_TYPE = "page-type"

const RUNS = "runsTabooCheck"

const TEXT = new TextDecoder()

const JUDGE = "Read what it bars, then judge for yourself whether you meant a sense it bars."

const WEIGH =
  "Match what you meant against the senses it keeps first, then judge for yourself whether you meant a sense it bars."

const BARS = "It bars these senses:"

const KEEPS = "It is written in these senses, and asks nothing of you where you meant one:"

const INSIDE = [
  "The term is inside a camelCase name your change writes rather than a word of its own.",
  "Read the humps of the names you wrote as spaces to find it, then rename the one that means a sense below.",
].join("\n")

const HUMP = /([a-z0-9])([A-Z])/g

const RUN_END = /([A-Z]+)([A-Z][a-z])/g

export type Sense = {
  readonly sense: string
  readonly instead: string
}

export type Term = {
  readonly path: string
  readonly pattern: string
  readonly senses: readonly Sense[]
  readonly kept: readonly string[]
}

export type Reach = "written" | "seam"

export function owedOf(senses: readonly Sense[], kept: readonly string[], reach: Reach): string {
  const barred = senses.map((one) => `  ${one.sense} — write ${one.instead} instead`)
  const opening = ["Your change writes a taboo term.", ...(reach === "seam" ? [INSIDE] : [])]
  if (kept.length === 0) return [...opening, ...barred, JUDGE].join("\n")
  return [...opening, KEEPS, ...kept.map((one) => `  ${one}`), BARS, ...barred, WEIGH].join("\n")
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

export function seamsApart(text: string): string {
  return text.replace(HUMP, "$1 $2").replace(RUN_END, "$1 $2")
}

export function foundIn(pattern: string, added: string): boolean {
  try {
    return new RegExp(pattern, "gi").test(added)
  } catch {
    return false
  }
}

export function reachOf(pattern: string, added: string): Reach | null {
  if (foundIn(pattern, added)) return "written"
  if (foundIn(pattern, seamsApart(added))) return "seam"
  return null
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

function keptOf(said: unknown): readonly string[] {
  if (!Array.isArray(said)) return []
  return said.filter((one): one is string => typeof one === "string")
}

export function judgedIn(path: string, unjudged: ReadonlySet<string>): boolean {
  const said = partedIn(path)
  if (said === null) return true
  return !unjudged.has(said.pageType)
}

export function unjudgedIn(root: string): ReadonlySet<string> {
  const found = new Set<string>()
  for (const page of everyOfType(root, PAGE_TYPE)) {
    const value = valueAt(page.path, root)
    if (value === null || value[RUNS] !== false) continue
    const slug = value["slug"]
    if (typeof slug === "string") found.add(slug)
  }
  return found
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
    found.push({ path: standing.path, pattern, senses, kept: keptOf(value["keptSenses"]) })
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
  if (!judgedIn(path, unjudgedIn(root))) return []
  const found: Warrant[] = []
  for (const term of termsIn(root)) {
    if (term.path === path) continue
    const reach = reachOf(term.pattern, added)
    if (reach === null) continue
    const oid = blobAt(root, term.path)
    if (oid === null) continue
    found.push({ path: term.path, oid, owed: owedOf(term.senses, term.kept, reach) })
  }
  return found
}
