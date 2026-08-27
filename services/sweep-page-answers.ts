export const tool = {
  summary: "Delete every kept page answer older than the day it is allowed to stand",
  repos: ["instructions"],
} as const

import { existsSync, readdirSync, rmdirSync, rmSync, statSync } from "node:fs"
import { resolveRoots } from "../repo/roots/roots"

const HELP = `bun services/sweep-page-answers.ts — delete every kept page answer older than a day

pages/domain/pages-cache-key.domain.md says answers worked out from different states of the pages
stand together, so a state's answers are kept beside every other state's rather than replacing them.
Nothing in the writing path takes an old state away, because taking it away is what standing
together forbids. This is what bounds the set instead.

Two sets are swept: the whole-tree answers under .git/pages-answers, and the resolved page type
answers under .git/pages/resolved/page-type, which are kept one folder per page type slug. A slug
folder left empty is taken away with its answers, so a page type that is gone leaves nothing behind.

AGE IS TAKEN FROM THE FILE, NOT FROM THE COMMIT. An answer names the state it was worked out from
and not when that state was current, so how long it has stood is the only thing on disk that says
whether anybody still wants it. An answer still in use is rewritten on the next miss, which costs
one compile and no correctness: pages/domain/caching.domain.md says deleting a cache changes only how long
its answer takes.

A SWEEP THAT DELETES NOTHING SAYS NOTHING.`

const ANSWERS = ".git/pages-answers"

const RESOLVED = ".git/pages/resolved/page-type"

const DAY_MS = 24 * 60 * 60 * 1000

function stood(at: string, now: number): boolean {
  try {
    return now - statSync(at).mtimeMs > DAY_MS
  } catch {
    return false
  }
}

function take(at: string): boolean {
  try {
    rmSync(at)
    return true
  } catch {
    return false
  }
}

function sweepFlat(dir: string, now: number): number {
  if (!existsSync(dir)) return 0
  let gone = 0
  for (const name of readdirSync(dir)) {
    const at = `${dir}/${name}`
    if (stood(at, now) && take(at)) gone++
  }
  return gone
}

function sweepBySlug(dir: string, now: number): number {
  if (!existsSync(dir)) return 0
  let gone = 0
  for (const slug of readdirSync(dir)) {
    const under = `${dir}/${slug}`
    gone += sweepFlat(under, now)
    try {
      if (readdirSync(under).length === 0) rmdirSync(under)
    } catch {
      continue
    }
  }
  return gone
}

export function sweep(root: string, now: number): number {
  return sweepFlat(`${root}/${ANSWERS}`, now) + sweepBySlug(`${root}/${RESOLVED}`, now)
}

if (import.meta.main) {
  if (process.argv.includes("--help")) {
    console.log(HELP)
  } else {
    const root = resolveRoots().akasha
    const gone = sweep(root, Date.now())
    if (gone > 0) console.log(`swept ${gone} page answer(s) that had stood over a day in ${root}/.git`)
  }
}
