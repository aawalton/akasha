import { dirname } from "node:path"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { calledIn } from "akasha/code/workspace/modules/package-manifest/package-manifest.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export const HELD = "held-addon"

export const ADDON = "temper-addon"

const MANIFEST = "addon-manifest"

const HOLDS = "addonManifest"

const CALLED = "addonName"

const REACHES = "temperAddon"

const NOTHING_MANIFESTED =
  "the index files held addon pages and not one addon manifest reads, so nothing here says " +
  "which addons the tree holds"

export type Asking = {
  readonly pathsOfType: (pageTypeSlug: string) => readonly string[]
  readonly valueAt: (path: string) => Value | null
  readonly folderOf: (pageTypeSlug: string, slug: string) => string | null
  readonly textAt: (path: string) => string | null
}

export type Roster = ReadonlyMap<string, readonly string[]>

export type Naming = {
  readonly path: string
  readonly named: string
  readonly folder: string | null
}

type Manifested = {
  readonly named: string
  readonly folder: string
}

function manifestedUnder(asking: Asking, pageTypeSlug: string): readonly Manifested[] {
  const found: Manifested[] = []
  for (const path of asking.pathsOfType(pageTypeSlug)) {
    const value = asking.valueAt(path)
    if (value === null) continue
    const held = textAt(value, HOLDS)
    if (held === null) continue
    const at = besideAt(path, MANIFEST, held)
    if (at === null) continue
    const named = calledIn(asking.textAt(at))
    if (named === null) continue
    found.push({ named, folder: dirname(path) })
  }
  return found
}

export function rosterIn(asking: Asking): Roster {
  const gathered = new Map<string, string[]>()
  for (const { named, folder } of manifestedUnder(asking, ADDON)) {
    const folders = gathered.get(named)
    if (folders === undefined) gathered.set(named, [folder])
    else folders.push(folder)
  }
  const roster = new Map<string, readonly string[]>()
  for (const [named, folders] of gathered) roster.set(named, [...folders].sort())
  return roster
}

export function heldIn(asking: Asking): readonly Naming[] {
  const found: Naming[] = []
  for (const path of asking.pathsOfType(HELD)) {
    const value = asking.valueAt(path)
    if (value === null) continue
    const named = textAt(value, CALLED)
    const slug = slugAt(value, REACHES)
    if (named === null || slug === null) continue
    const folder = asking.folderOf(ADDON, slug)
    found.push({ path, named, folder })
  }
  return found
}

function staleSaid(named: string): string {
  return (
    `\`${named}\` is the addon this page names, and no addon manifest in the tree calls ` +
    "an addon that — the page is stale"
  )
}

function elsewhereSaid(named: string, at: readonly string[], folder: string): string {
  return (
    `\`${named}\` is manifested at \`${at.join("`, `")}\`, and this page names the addon page ` +
    `sitting in \`${folder}\` — repoint the page`
  )
}

function reasonsFor(one: Naming, roster: Roster): readonly string[] {
  const at = roster.get(one.named)
  if (at === undefined) return [staleSaid(one.named)]
  if (one.folder === null || at.includes(one.folder)) return []
  return [elsewhereSaid(one.named, at, one.folder)]
}

export function refusalsOver(asking: Asking): readonly Judged[] {
  const held = heldIn(asking)
  if (held.length === 0) return []
  const roster = rosterIn(asking)
  if (roster.size === 0) throw new Error(NOTHING_MANIFESTED)
  const said: Judged[] = []
  for (const one of held) {
    for (const reason of reasonsFor(one, roster)) said.push({ path: one.path, reason })
  }
  return said
}
