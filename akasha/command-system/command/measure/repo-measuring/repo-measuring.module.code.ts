import { existsSync, readdirSync } from "node:fs"
import { join } from "node:path"

const SKIPPED: readonly string[] = ["node_modules", ".git", "dist"]

const AKASHA_DIR = "akasha"

const PERCENT_DECIMALS = 2

export interface Counts {
  readonly repo: number
  readonly akasha: number
}

function filesUnder(at: string): number {
  let found = 0
  for (const one of readdirSync(at, { withFileTypes: true })) {
    if (one.isDirectory()) {
      if (SKIPPED.includes(one.name)) continue
      found += filesUnder(join(at, one.name))
      continue
    }
    if (one.isFile()) found += 1
  }
  return found
}

export function akashaStandsIn(root: string): boolean {
  return existsSync(join(root, AKASHA_DIR))
}

export function countsIn(root: string): Counts {
  return { repo: filesUnder(root), akasha: filesUnder(join(root, AKASHA_DIR)) }
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
