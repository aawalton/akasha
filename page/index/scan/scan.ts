import { onceInCall } from "../../../during-call/during-call.ts"
import { matchesGlob } from "../../glob/glob.ts"
import { builtFrom, indexReaches, loadPages } from "../store/store.ts"

const SUFFIXED = /\*\.[a-z0-9-]+\.md$/

/**
 * The paths in the index matching these globs, worked out once for the length of a call.
 *
 * EVERY ASK WALKS EVERY PAGE. The index holds every page in the repository and this matches each
 * one against each glob, so one ask costs the whole index however few paths it answers with. A
 * reader asking about many page types asks many times, and the readouts ask once per readout:
 * measured on 2026-08-28, the status bar's groups spent most of a 1.68s strip inside glob matching
 * alone, over the same handful of distinct globs.
 *
 * HELD AGAINST THE CALL, WHICH IS THE MOMENT IT READS. The index is what the answer is taken from,
 * and everything else held against a call already reads it as it stood when the call opened.
 */
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
