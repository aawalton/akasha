import { readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { join } from "node:path"
import { textOf } from "akasha/code/modules/body-text/body-text.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"

const LOADER = "ts"

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const NO_PLUGIN =
  "a body the change leaves is loaded with `Bun.plugin`, which only bun carries, and this runtime " +
  "holds no `Bun` global"

const loadFrom = createRequire(import.meta.url)

const bodyHeld = new Map<string, string>()

const claimed = new Set<string>()

const CHANGED = new WeakMap<Change, ReadonlySet<string>>()

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

function forgotten(full: string): undefined {
  delete loadFrom.cache[full]
}

function claiming(full: string): undefined {
  if (claimed.has(full)) return
  claimed.add(full)
  const filter = new RegExp("^" + full.replace(SPECIAL, "\\$&") + "$")
  Bun.plugin({
    name: full,
    setup: (build) => {
      build.onLoad({ filter }, (args) => ({
        contents: bodyHeld.get(args.path) ?? readFileSync(args.path, "utf8"),
        loader: LOADER,
      }))
    },
  })
}

function loadedOver(full: string, body: string): Held {
  if (typeof Bun === "undefined") throw new Error(NO_PLUGIN)
  bodyHeld.set(full, body)
  claiming(full)
  forgotten(full)
  try {
    return loadFrom(full) as Held
  } finally {
    bodyHeld.delete(full)
    forgotten(full)
  }
}

export function heldOver(root: string, at: string, body: string | null): Held {
  const full = join(root, at)
  return body === null ? (loadFrom(full) as Held) : loadedOver(full, body)
}

export function leftHeldAt(root: string, at: string): boolean {
  const full = join(root, at)
  return bodyHeld.has(full) || loadFrom.cache[full] !== undefined
}
