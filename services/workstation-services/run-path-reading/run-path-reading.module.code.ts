import { existsSync } from "node:fs"
import { resolve } from "node:path"

const RUNNABLE = /\.(ts|sh)$/
const ELSEWHERE = /^[-/~%]/
const SCHEME = "://"

export type Stray = {
  readonly pagePath: string
  readonly run: string
  readonly path: string
}

export function pathsIn(run: string): readonly string[] {
  const took: string[] = []
  for (const word of run.split(/\s+/)) {
    if (!RUNNABLE.test(word)) continue
    if (ELSEWHERE.test(word)) continue
    if (word.includes(SCHEME)) continue
    took.push(word)
  }
  return took
}

export function straysIn(
  root: string,
  pagePath: string,
  runs: readonly string[]
): readonly Stray[] {
  const took: Stray[] = []
  for (const run of runs) {
    for (const path of pathsIn(run)) {
      if (!existsSync(resolve(root, path))) took.push({ pagePath, run, path })
    }
  }
  return took
}
