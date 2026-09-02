import { counted } from "../../../asking/asking.module.code.ts"
import { namedTracked } from "../../../outside-naming/outside-naming.module.code.ts"

export const NAMING_SPELLING =
  "what was looked for is the paths you named, spelled as text in the tracked bodies the base " +
  "commit holds, so a body reaching what goes by any other spelling is not found here"

export type Naming = { readonly namers: readonly string[] } | { readonly refusal: string }

export function leftNaming(
  root: string,
  base: string,
  named: readonly string[],
  going: ReadonlySet<string>
): Naming {
  if (named.length === 0) return { namers: [] }
  const found = namedTracked(root, base, named, [])
  if ("refusal" in found) return { refusal: found.refusal }
  return { namers: found.paths.filter((one) => !going.has(one)) }
}

export function leftNamingSaid(
  searched: readonly string[],
  namers: readonly string[],
  dry: boolean
): readonly string[] {
  if (searched.length === 0) return []
  const goes = dry ? "would go" : "went"
  if (namers.length === 0) {
    return [`no tracked file left behind names what ${goes}`, NAMING_SPELLING]
  }
  return [
    `what ${goes} is still named by ${counted(namers.length, "tracked file")} left behind, and ` +
      `nothing here repoints them — ${namers.join(", ")}`,
    NAMING_SPELLING,
  ]
}
