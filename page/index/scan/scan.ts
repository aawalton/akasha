import { realpathSync } from "node:fs"
import { rootsHere } from "../../../repo/roots/roots.ts"
import { builtFrom, loadPages } from "../store/store.ts"

const SUFFIXED = /\*\.[a-z0-9-]+\.md$/

function sameTree(one: string, two: string): boolean {
  if (one === two) return true
  try {
    return realpathSync(one) === realpathSync(two)
  } catch {
    return false
  }
}

export function scannedFromIndex(
  root: string,
  patterns: readonly string[],
  repo: string | null
): readonly string[] | null {
  if (repo === null || patterns.length === 0) return null
  if (!patterns.every((one) => SUFFIXED.test(one))) return null
  const here = rootsHere()[repo]
  if (here === undefined || !sameTree(here, root)) return null
  const marks = builtFrom()
  if (marks === null || marks[repo] === undefined) {
    throw new Error(
      `the page index was not built over \`${repo}\`, so a scan of ${patterns.join(", ")} has ` +
        "nothing to read there. An empty answer would read exactly like a repository with no page " +
        "in it, and every check over it would pass, so this refuses instead. Write the index again " +
        "with `ops index refresh`."
    )
  }
  const matching = patterns.map((one) => new Bun.Glob(one))
  const found = new Set<string>()
  for (const one of loadPages()) {
    if (one.repo !== repo) continue
    if (matching.some((each) => each.match(one.key))) found.add(one.key)
  }
  return [...found].sort()
}
