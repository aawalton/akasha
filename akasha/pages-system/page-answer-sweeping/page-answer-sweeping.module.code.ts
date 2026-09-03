import { existsSync, readdirSync, rmdirSync, rmSync, statSync } from "node:fs"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

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
    } catch {}
  }
  return gone
}

export function sweep(root: string, now: number): number {
  return sweepFlat(`${root}/${ANSWERS}`, now) + sweepBySlug(`${root}/${RESOLVED}`, now)
}

if (import.meta.main) {
  const root = rootFor(resolveRoots(), AKASHA)
  const gone = sweep(root, Date.now())
  if (gone > 0) {
    process.stdout.write(
      `${gone} page answers that were kept longer than a day are gone from ${root}/.git\n`
    )
  }
}
