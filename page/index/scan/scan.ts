import { onceInCall } from "../../../during-call/during-call.ts"
import { matchesGlob } from "../../glob/glob.ts"
import { REPOS } from "../../../repo/roots/roots.ts"
import { builtFrom, indexReaches, loadPages } from "../store/store.ts"

const SUFFIXED = /\*\.[a-z0-9-]+\.md$/

export function indexWouldAnswer(root: string, patterns: readonly string[]): string | null {
  if (patterns.length === 0) return null
  if (!patterns.every((one) => SUFFIXED.test(one))) return null
  return REPOS.find((one) => indexReaches(one, root)) ?? null
}

export function scannedFromIndex(
  root: string,
  patterns: readonly string[],
  repo: string | null
): readonly string[] | null {
  if (repo === null || patterns.length === 0) return null
  if (!patterns.every((one) => SUFFIXED.test(one))) return null
  if (!indexReaches(repo, root)) return null
  return onceInCall(`scan:${repo}:${root}:${[...patterns].sort().join(" ")}`, () => {
    const marks = builtFrom()
    if (marks === null || marks[repo] === undefined) {
      throw new Error(
        `the page index was not built over \`${repo}\`, so a scan of ${patterns.join(", ")} has ` +
          "nothing to read there. An empty answer would read exactly like a repository with no page " +
          "in it, and every check over it would pass, so this refuses instead. Write the index again " +
          "with `ops index refresh`."
      )
    }
    const found = new Set<string>()
    for (const one of loadPages()) {
      if (one.repo !== repo) continue
      if (patterns.some((each) => matchesGlob(one.key, each))) found.add(one.key)
    }
    return [...found].sort()
  })
}
