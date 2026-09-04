import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import {
  censusOver,
  censusSaid,
  countedIn,
  faultedIn,
  pathsIn,
} from "../../part-census/part-census.module.code.ts"

const INPUT = 1

const FAULTED = 2

const PATHS = "--paths"

const COUNTS = "--counts"

export type Asked = {
  readonly paths: boolean
  readonly counts: boolean
}

export function askedOf(argv: readonly string[]): Asked | string {
  let paths = false
  let counts = false
  for (const one of argv) {
    if (one === PATHS) {
      paths = true
      continue
    }
    if (one === COUNTS) {
      counts = true
      continue
    }
    return `\`${one}\` is nothing \`akasha part-census\` takes`
  }
  return { paths, counts }
}

export function partCensus(argv: readonly string[], given: Given): Answer {
  const asked = askedOf(argv)
  if (typeof asked === "string") return refused(asked, INPUT)
  const census = censusOver(given.root)
  const report = asked.paths
    ? [...pathsIn(census)]
    : [...censusSaid(census), ...(asked.counts ? countedIn(census) : [])]
  return { report, refusals: [], code: faultedIn(census) ? FAULTED : 0 }
}
