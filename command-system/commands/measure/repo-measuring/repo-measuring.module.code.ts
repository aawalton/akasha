import { existsSync } from "node:fs"
import { join } from "node:path"
import { said as gitSaid } from "@akasha/git/git-running"

const AKASHA_DIR = "akasha"

const INSIDE = `${AKASHA_DIR}/`

const PARTED_BY = "\0"

const PERCENT_DECIMALS = 2

const LISTED: readonly string[] = ["ls-files", "-z", "--cached", "--others", "--exclude-standard"]

export interface Counts {
  readonly repo: number
  readonly akasha: number
}

function pathsIn(root: string): readonly string[] {
  const said = gitSaid(root, LISTED)
  return [...new Set(said.split(PARTED_BY).filter((one) => one !== ""))]
}

export function akashaUnder(root: string): boolean {
  return existsSync(join(root, AKASHA_DIR))
}

export function countsIn(root: string): Counts {
  const paths = pathsIn(root)
  return { repo: paths.length, akasha: paths.filter((one) => one.startsWith(INSIDE)).length }
}

export function shareOf(counts: Counts): string {
  return ((counts.akasha / counts.repo) * 100).toFixed(PERCENT_DECIMALS)
}

export function linesOf(counts: Counts): readonly string[] {
  const akasha = String(counts.akasha)
  const repo = String(counts.repo)
  const share = `${shareOf(counts)}%`
  const width = Math.max(akasha.length, repo.length, share.length)
  return [
    `akasha ${akasha.padStart(width)}`,
    `repo   ${repo.padStart(width)}`,
    `share  ${share.padStart(width)}`,
  ]
}
