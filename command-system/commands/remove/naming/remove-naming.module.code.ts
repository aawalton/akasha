import { counted, textOf } from "../../../asking/asking.module.code.ts"
import { bodyAt } from "../../../commit-reading/commit-reading.module.code.ts"
import {
  reachedTracked,
  spelledTracked,
} from "../../../outside-naming/outside-naming.module.code.ts"

const PARTED_BY = "/"

const FINDING = ".finding.ts"

const MANIFEST = "package.json"

const NAME = "name"

export const NAMING_SPELLING =
  "what was looked for is each path you named and the package name each manifest that goes " +
  "declares, spelled as text in the tracked bodies the base commit holds and ended where the " +
  "path ends rather than running on into a longer one, so a body building a path out of pieces " +
  "is not found here"

export const REACHING_SPELLING =
  "the wider sweep is the last part of each file that goes, looked for with a slash beside that " +
  "part and nothing else asked of it, so `main.ts` reaches every `main.ts` the repository holds " +
  "— read what it found rather than counting it, and a directory that goes is swept for by no " +
  "last part of its own, a directory being no name a body reaches"

export type Found = {
  readonly namers: readonly string[]
  readonly reaches: readonly string[]
  readonly recorded: readonly string[]
}

export type Naming = Found | { readonly refusal: string }

export const NAMING_NOTHING: Found = { namers: [], reaches: [], recorded: [] }

export type Looked = {
  readonly whole: readonly string[]
  readonly parts: readonly string[]
}

export function lookedFor(named: readonly string[], under: readonly string[]): Looked {
  const whole = new Set(named)
  const parts = new Set<string>()
  const directory = (path: string): boolean =>
    under.some((file) => file.startsWith(`${path}${PARTED_BY}`))
  for (const one of [...named.filter((path) => !directory(path)), ...under]) {
    const last = one.slice(one.lastIndexOf(PARTED_BY) + 1)
    if (last !== "" && last !== one) parts.add(last)
  }
  return { whole: [...whole].sort(), parts: [...parts].sort() }
}

export function nameDeclaredIn(text: string): string | null {
  let read: unknown
  try {
    read = JSON.parse(text)
  } catch {
    return null
  }
  if (read === null || typeof read !== "object") return null
  const held = (read as Record<string, unknown>)[NAME]
  return typeof held === "string" && held !== "" ? held : null
}

export function namesDeclared(
  root: string,
  base: string,
  going: readonly string[]
): readonly string[] {
  const found = new Set<string>()
  for (const one of going) {
    if (one !== MANIFEST && !one.endsWith(`${PARTED_BY}${MANIFEST}`)) continue
    const bytes = bodyAt(root, base, one)
    const text = bytes === null ? null : textOf(bytes)
    if (text === null) continue
    const held = nameDeclaredIn(text)
    if (held !== null) found.add(held)
  }
  return [...found].sort()
}

export function leftNaming(
  root: string,
  base: string,
  named: readonly string[],
  under: readonly string[],
  going: ReadonlySet<string>
): Naming {
  if (named.length === 0) return NAMING_NOTHING
  const looked = lookedFor(named, under)
  const declared = namesDeclared(root, base, [...named, ...under])
  const spelled = spelledTracked(root, base, [...looked.whole, ...declared], [])
  if ("refusal" in spelled) return { refusal: spelled.refusal }
  const reached = reachedTracked(root, base, looked.parts, [])
  if ("refusal" in reached) return { refusal: reached.refusal }
  const sure = spelled.paths.filter((one) => !going.has(one))
  const held = new Set(sure)
  return {
    namers: sure.filter((one) => !one.endsWith(FINDING)),
    reaches: reached.paths.filter((one) => !going.has(one) && !held.has(one)),
    recorded: sure.filter((one) => one.endsWith(FINDING)),
  }
}

export function leftNamingSaid(searched: readonly string[], found: Found): readonly string[] {
  if (searched.length === 0) return []
  const said: string[] = [
    found.namers.length === 0
      ? "no tracked file left behind names what went"
      : `what went is still named by ${counted(found.namers.length, "tracked file")} left ` +
        `behind, and nothing here repoints them — ${found.namers.join(", ")}`,
  ]
  if (found.recorded.length > 0) {
    said.push(
      "what went is named as a record of what was so by " +
        `${counted(found.recorded.length, "finding")}, and a record is never repointed — ` +
        found.recorded.join(", ")
    )
  }
  said.push(NAMING_SPELLING)
  if (found.reaches.length > 0) {
    said.push(
      `a wider sweep than that one reaches ${counted(found.reaches.length, "further tracked file")}` +
        `, and most of these will name something else of the same last part — ` +
        found.reaches.join(", "),
      REACHING_SPELLING
    )
  }
  return said
}
