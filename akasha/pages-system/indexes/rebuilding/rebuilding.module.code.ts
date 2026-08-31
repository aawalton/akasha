import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { type Stamp, stampIn } from "../index-stamp/index-stamp.module.code.ts"
import { indexIn } from "../index-surface/index-surface.module.code.ts"
import { rebuiltFrom } from "../indexing/indexing.module.code.ts"

const ASIDE = "refreshing"

const GONE = "replaced"

export type Drift = {
  readonly added: readonly string[]
  readonly changed: readonly string[]
  readonly went: readonly string[]
}

export type Rebuilt = {
  readonly pages: number
  readonly entries: number
  readonly refused: readonly string[]
  readonly stamp: Stamp | null
  readonly drift: Drift
}

function filesUnder(at: string): readonly string[] {
  if (!existsSync(at)) return []
  const found: string[] = []
  const walk = (here: string, said: string): undefined => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const named = `${said}${one.name}`
      if (one.isDirectory()) walk(join(here, one.name), `${named}/`)
      else found.push(named)
    }
  }
  walk(at, "")
  return found.sort()
}

export function driftBetween(was: string, now: string): Drift {
  const before = new Set(filesUnder(was))
  const added: string[] = []
  const changed: string[] = []
  for (const one of filesUnder(now)) {
    if (!before.has(one)) {
      added.push(one)
      continue
    }
    before.delete(one)
    if (readFileSync(join(was, one), "utf8") !== readFileSync(join(now, one), "utf8")) {
      changed.push(one)
    }
  }
  return { added, changed, went: [...before].sort() }
}

function swapped(at: string, aside: string): undefined {
  const gone = `${at}.${GONE}.${process.pid}`
  rmSync(gone, { recursive: true, force: true })
  if (existsSync(at)) renameSync(at, gone)
  mkdirSync(dirname(at), { recursive: true })
  renameSync(aside, at)
  rmSync(gone, { recursive: true, force: true })
}

export function rebuiltWhole(repo: string, tree: string, put: boolean): Rebuilt {
  const at = indexIn(repo)
  const aside = `${at}.${ASIDE}.${process.pid}`
  try {
    rmSync(aside, { recursive: true, force: true })
    mkdirSync(aside, { recursive: true })
    const said = rebuiltFrom(tree, aside, repo)
    const drift = driftBetween(at, aside)
    const stamp = stampIn(aside)
    if (put) swapped(at, aside)
    return { ...said, drift, stamp }
  } finally {
    rmSync(aside, { recursive: true, force: true })
  }
}
