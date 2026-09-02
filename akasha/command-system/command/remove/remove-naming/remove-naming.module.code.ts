import { counted } from "../../../asking/asking.module.code.ts"
import { namedTracked, reachedTracked } from "../../../outside-naming/outside-naming.module.code.ts"

const PARTED_BY = "/"

const FINDING = ".finding.ts"

export const NAMING_SPELLING =
  "what was looked for is the paths you named, spelled as text in the tracked bodies the base " +
  "commit holds, and the last part of each path you named and of each file under those paths, " +
  "spelled as a whole path part with a slash beside that part, so a body building a path out " +
  "of pieces, or reaching what goes by a name of its own, or spelling a last part no slash " +
  "sits beside, is not found here"

export type Found = {
  readonly namers: readonly string[]
  readonly recorded: readonly string[]
}

export type Naming = Found | { readonly refusal: string }

export const NAMING_NOTHING: Found = { namers: [], recorded: [] }

export type Looked = {
  readonly whole: readonly string[]
  readonly parts: readonly string[]
}

export function lookedFor(named: readonly string[], under: readonly string[]): Looked {
  const whole = new Set(named)
  const parts = new Set<string>()
  for (const one of [...named, ...under]) {
    const last = one.slice(one.lastIndexOf(PARTED_BY) + 1)
    if (last !== "" && last !== one) parts.add(last)
  }
  return { whole: [...whole].sort(), parts: [...parts].sort() }
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
  const whole = namedTracked(root, base, looked.whole, [])
  if ("refusal" in whole) return { refusal: whole.refusal }
  const reached = reachedTracked(root, base, looked.parts, [])
  if ("refusal" in reached) return { refusal: reached.refusal }
  const left = [...new Set([...whole.paths, ...reached.paths])]
    .sort()
    .filter((one) => !going.has(one))
  return {
    namers: left.filter((one) => !one.endsWith(FINDING)),
    recorded: left.filter((one) => one.endsWith(FINDING)),
  }
}

export function leftNamingSaid(
  searched: readonly string[],
  found: Found,
  dry: boolean
): readonly string[] {
  if (searched.length === 0) return []
  const goes = dry ? "would go" : "went"
  const said: string[] = [
    found.namers.length === 0
      ? `no tracked file left behind names what ${goes}`
      : `what ${goes} is still named by ${counted(found.namers.length, "tracked file")} left ` +
        `behind, and nothing here repoints them — ${found.namers.join(", ")}`,
  ]
  if (found.recorded.length > 0) {
    said.push(
      `what ${goes} is named as a record of what was so by ` +
        `${counted(found.recorded.length, "finding")}, and a record is never repointed — ` +
        found.recorded.join(", ")
    )
  }
  said.push(NAMING_SPELLING)
  return said
}
