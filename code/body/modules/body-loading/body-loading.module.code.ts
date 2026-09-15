import { existsSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const LOADER = "ts"

const PACKAGE = "akasha/"

const CARRIED = "akasha-carried"

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const CODE = /\.tsx?$/

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

function forgotten(full: string): undefined {
  delete loadFrom.cache[full]
}

function forgottenUnder(root: string): undefined {
  const under = `${root}/`
  for (const full of Object.keys(loadFrom.cache)) {
    if (full.startsWith(under)) forgotten(full)
  }
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

function loadedOver(root: string, full: string, bodies: ReadonlyMap<string, string>): Held {
  if (typeof Bun === "undefined") throw new Error(NO_PLUGIN)
  for (const [path, body] of bodies) {
    bodyHeld.set(path, body)
    claiming(root, path)
  }
  forgottenUnder(root)
  try {
    return loadFrom(full) as Held
  } finally {
    for (const path of bodies.keys()) bodyHeld.delete(path)
    forgottenUnder(root)
  }
}

export function heldOver(change: Change, at: string, body: string | null): Held {
  const full = join(change.root, at)
  const bodies = new Map(bodiesIn(change))
  if (body !== null) bodies.set(full, body)
  if (bodies.size === 0) return loadFrom(full) as Held
  return loadedOver(change.root, full, bodies)
}
