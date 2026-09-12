import { mkdirSync, rmSync, statSync, unlinkSync } from "node:fs"
import { dirname, join } from "node:path"
import { DEPLOYS } from "akasha/files/git-place/git-place.module.code.ts"
import {
  alive,
  holderOf,
  markIn,
  startedAt,
} from "akasha/files/lock-holder/lock-holder.module.code.ts"
import { gitDirIn } from "akasha/git/dir/git-dir.module.code.ts"
import { taken } from "akasha/git/holding/holding.module.code.ts"

const A_LOCK = ".lock"

const A_SECOND = 1000

const TRIES = 2

export type Held<T> = { readonly value: T } | { readonly refused: string }

export function holdAt(root: string, slug: string): string | null {
  const dir = gitDirIn(root)
  return dir === null ? null : join(dir, DEPLOYS, `${slug}${A_LOCK}`)
}

export function sinceAt(at: string, now: number): number {
  try {
    return Math.max(0, Math.round((now - statSync(at).mtimeMs) / A_SECOND))
  } catch {
    return 0
  }
}

export function saidOfHeld(slug: string, pid: number, seconds: number): string {
  return `a deploy of \`${slug}\` is already running under process ${pid}, which took the hold ${seconds}s ago, and one thing has one deploy running at a time`
}

export function saidOfNoHold(slug: string, at: string): string {
  return `the hold on \`${slug}\` at ${at} could not be taken and could not be cleared, so nothing was put up`
}

export async function heldWhile<T>(
  root: string,
  slug: string,
  act: () => Promise<T>,
  now: number = Date.now()
): Promise<Held<T>> {
  const at = holdAt(root, slug)
  if (at === null) {
    return { refused: `${root} is no git checkout, so no deploy of \`${slug}\` is held apart` }
  }
  mkdirSync(dirname(at), { recursive: true })
  const mine = `${process.pid} ${startedAt(process.pid)}`
  let mineNow = false
  for (let tries = 0; tries < TRIES && !mineNow; tries += 1) {
    if (taken(at, mine)) {
      mineNow = true
      break
    }
    const holder = holderOf(markIn(at))
    if (holder !== null && alive(holder)) {
      return { refused: saidOfHeld(slug, holder.pid, sinceAt(at, now)) }
    }
    try {
      rmSync(at, { force: true })
    } catch {}
  }
  if (!mineNow) return { refused: saidOfNoHold(slug, at) }
  try {
    return { value: await act() }
  } finally {
    if (markIn(at) === mine) {
      try {
        unlinkSync(at)
      } catch {}
    }
  }
}
