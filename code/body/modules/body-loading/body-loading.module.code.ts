import { existsSync, readFileSync, statSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const LOADER = "ts"

const PACKAGE = "akasha/"

const CARRIED = "akasha-carried"

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const CODE = /\.tsx?$/

const MODULES = "/node_modules/"

const NO_PLUGIN =
  "a body the change leaves is loaded with `Bun.plugin`, which only bun carries, and this runtime " +
  "holds no `Bun` global"

const loadFrom = createRequire(import.meta.url)

const bodyHeld = new Map<string, string>()

const claimed = new Set<string>()

const CHANGED = new WeakMap<Change, ReadonlySet<string>>()

const BODIES = new WeakMap<Change, ReadonlyMap<string, string>>()

export type Held = Record<string, unknown>

function changedIn(change: Change): ReadonlySet<string> {
  const found = CHANGED.get(change)
  if (found !== undefined) return found
  const made = new Set(change.changed)
  CHANGED.set(change, made)
  return made
}

export function bodyFor(change: Change, at: string): string | null {
  return changedIn(change).has(at) ? textOf(change.after(at)) : null
}

function bodiesIn(change: Change): ReadonlyMap<string, string> {
  const found = BODIES.get(change)
  if (found !== undefined) return found
  const made = new Map<string, string>()
  for (const at of change.changed) {
    if (!CODE.test(at)) continue
    const body = textOf(change.after(at))
    if (body !== null) made.set(join(change.root, at), body)
  }
  BODIES.set(change, made)
  return made
}

const STAMPED = new Map<string, string>()

const LOOKED = new WeakSet<Change>()

function stampOf(full: string): string {
  const said = statSync(full, { throwIfNoEntry: false })
  return said === undefined ? "" : `${said.mtimeMs}:${said.size}`
}

function forgotten(full: string): undefined {
  delete loadFrom.cache[full]
  delete loadFrom.cache[`${CARRIED}:${full}`]
  STAMPED.delete(full)
}

function cachedUnder(root: string): readonly string[] {
  const under = `${root}/`
  const away = `${root}${MODULES}`
  return Object.keys(loadFrom.cache).filter(
    (full) => full.startsWith(under) && !full.startsWith(away)
  )
}

function forgottenUnder(root: string): undefined {
  for (const full of cachedUnder(root)) forgotten(full)
}

function stamping(root: string): undefined {
  for (const full of cachedUnder(root)) {
    if (!STAMPED.has(full)) STAMPED.set(full, stampOf(full))
  }
}

function moved(root: string): boolean {
  const under = `${root}/`
  for (const [full, stamp] of STAMPED) {
    if (full.startsWith(under) && stampOf(full) !== stamp) return true
  }
  return false
}

function reaching(bodies: ReadonlyMap<string, string>): boolean {
  for (const full of bodies.keys()) {
    if (full in loadFrom.cache || `${CARRIED}:${full}` in loadFrom.cache) return true
  }
  return false
}

function anchored(one: string): RegExp {
  return new RegExp("^" + one.replace(SPECIAL, "\\$&") + "$")
}

function heldAt(args: { readonly path: string }): {
  readonly contents: string
  readonly loader: "ts"
} {
  return { contents: bodyHeld.get(args.path) ?? readFileSync(args.path, "utf8"), loader: LOADER }
}

function claiming(root: string, full: string): undefined {
  if (claimed.has(full)) return
  claimed.add(full)
  const filter = anchored(full)
  const opened = anchored(`${PACKAGE}${full.slice(root.length + 1)}`)
  const there = existsSync(full)
  Bun.plugin({
    name: full,
    setup: (build) => {
      build.onLoad({ filter }, heldAt)
      if (there) return
      build.onResolve({ filter: opened }, () => ({ path: full, namespace: CARRIED }))
      build.onLoad({ filter, namespace: CARRIED }, heldAt)
    },
  })
}

const NOTHING: ReadonlyMap<string, string> = new Map()

const KEPT: { change: Change | null; bodies: ReadonlyMap<string, string> } = {
  change: null,
  bodies: NOTHING,
}

function closing(root: string): undefined {
  for (const path of KEPT.bodies.keys()) {
    bodyHeld.delete(path)
    forgotten(path)
  }
  KEPT.change = null
  KEPT.bodies = NOTHING
  forgottenUnder(root)
  return undefined
}

function keeping(change: Change, bodies: ReadonlyMap<string, string>): undefined {
  if (KEPT.change === change) return undefined
  closing(change.root)
  for (const [path, body] of bodies) {
    bodyHeld.set(path, body)
    claiming(change.root, path)
  }
  KEPT.change = change
  KEPT.bodies = bodies
  return undefined
}

export function heldOver(change: Change, at: string, body: string | null): Held {
  const full = join(change.root, at)
  const bodies = bodiesIn(change)
  if (!LOOKED.has(change)) {
    LOOKED.add(change)
    if (KEPT.change !== change && moved(change.root)) closing(change.root)
  }
  if (body === null && !reaching(bodies)) {
    if (KEPT.change !== null && KEPT.change !== change) closing(change.root)
    const held = loadFrom(full) as Held
    if (!reaching(bodies)) {
      stamping(change.root)
      return held
    }
  }
  if (typeof Bun === "undefined") throw new Error(NO_PLUGIN)
  keeping(change, bodies)
  if (body !== null) {
    bodyHeld.set(full, body)
    claiming(change.root, full)
  }
  forgotten(full)
  const opened = bodyHeld.has(full) && !existsSync(full) ? `${PACKAGE}${at}` : full
  try {
    return loadFrom(opened) as Held
  } finally {
    forgotten(full)
    if (body !== null) {
      const held = bodies.get(full)
      if (held === undefined) bodyHeld.delete(full)
      else bodyHeld.set(full, held)
    }
  }
}
