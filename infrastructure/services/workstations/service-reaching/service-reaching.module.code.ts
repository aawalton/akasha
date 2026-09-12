import { typeScripted } from "akasha/code/file-kind/file-kind.module.code.ts"
import { pathsIn } from "akasha/infrastructure/services/workstations/run-path-reading/run-path-reading.module.code.ts"
import { importersIn, readingIn } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/pages/indexes/shape/index-shape.module.code.ts"

const A_WORD = /\s+/

const APART = " "

export const REACHED_CEILING = 20_000

export type Reached = {
  readonly files: ReadonlySet<string>
  readonly stopped: boolean
}

export function underTree(word: string, tree: string): string {
  if (tree === "") return word
  const lead = `${tree}/`
  return word.startsWith(lead) ? word.slice(lead.length) : word
}

export function runUnder(run: string, tree: string): string {
  if (tree === "") return run
  return run
    .split(A_WORD)
    .map((one) => underTree(one, tree))
    .join(APART)
}

export function filesRun(runs: readonly string[], tree: string): readonly string[] {
  const found = new Set<string>()
  for (const run of runs) for (const one of pathsIn(runUnder(run, tree))) found.add(one)
  return [...found].sort()
}

export function reachedBack(
  given: string | Reading,
  changed: readonly string[],
  ceiling: number = REACHED_CEILING
): Reached {
  const reading = readingIn(given)
  const files = new Set<string>(changed)
  const waiting = [...files].filter((one) => typeScripted(one))
  let stopped = false
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    if (files.size >= ceiling) {
      stopped = true
      break
    }
    for (const there of importersIn(reading, one)) {
      if (files.has(there)) continue
      files.add(there)
      if (typeScripted(there)) waiting.push(there)
    }
  }
  return { files, stopped }
}

export function reachingIn(files: readonly string[], reached: ReadonlySet<string>): string | null {
  for (const one of files) if (reached.has(one)) return one
  return null
}
