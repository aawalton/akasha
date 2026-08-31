import { createRequire } from "node:module"
import { join } from "node:path"
import { specifiersIn } from "../../../code-system/code-specifier/code-specifier.module.code.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import {
  filePropertiesAt,
  importedBy,
  pageTypesIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  everyPath,
  importersOf,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Reading } from "../../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { type Known, knownIn } from "../../../pages-system/indexes/reaching/reaching.module.code.ts"
import { exportedAs } from "../../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import {
  besideAt,
  heldIn,
  namedIn,
} from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { bodyOf } from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
import type { Judging, Standing } from "./folder-shape/folder-shape.page-type.ts"

const SHAPE = "folder-shape"

const CODE = "code"

const TS = "ts"

const loadFrom = createRequire(import.meta.url)

export type Shape = {
  readonly slug: string
  readonly judge: Judging
}

export function folderOf(path: string): string {
  const cut = path.lastIndexOf("/")
  return cut === -1 ? "" : path.slice(0, cut)
}

export function ancestorsOf(path: string): readonly string[] {
  const found: string[] = []
  let at = folderOf(path)
  while (at !== "") {
    found.push(at)
    at = folderOf(at)
  }
  return found
}

export function reachedFolders(target: string, importer: string): readonly string[] {
  const found: string[] = []
  let at = folderOf(target)
  while (at !== "" && !importer.startsWith(`${at}/`)) {
    found.push(at)
    at = folderOf(at)
  }
  return found
}

export function edgesOf(root: string, path: string, bytes: Uint8Array | null): ReadonlySet<string> {
  const found = new Set<string>()
  if (bytes === null) return found
  const text = bodyOf({ root, path, bytes })
  if (text === null) return found
  for (const one of specifiersIn(path, text)) {
    const landed = importedBy(path, one)
    if (landed !== null) found.add(landed)
  }
  return found
}

export function shapesIn(root: string, given: string | Reading): readonly Shape[] {
  const found: Shape[] = []
  for (const one of everyOfType(given, SHAPE)) {
    const said = namedIn(one.path)
    if (said === null) {
      throw new Error(`${one.path} is a folder shape, and its name says no slug`)
    }
    const slug = said.stem
    const beside = besideAt(one.path, CODE, TS)
    if (beside === null) {
      throw new Error(
        `${one.path} is a folder shape, and no code file can stand beside a name like it`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = loadFrom(join(root, beside)) as Record<string, unknown>
    } catch (thrown) {
      throw new Error(
        `${one.path} is a folder shape, and ${beside} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
      )
    }
    const named = mod[exportedAs(slug)]
    if (typeof named !== "function") {
      throw new Error(
        `${one.path} is a folder shape, and ${beside} answers to nothing that can judge`
      )
    }
    found.push({ slug, judge: named as Judging })
  }
  if (found.length === 0) {
    throw new Error(
      "no folder shape stands, so every folder would match nothing and a clean answer would mean nothing"
    )
  }
  return [...found].sort((one, two) => (one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0))
}

export function standingFiles(given: string | Reading, change: Change): readonly string[] {
  const found = new Set<string>(everyPath(given))
  for (const one of change.changed) {
    if (change.after(one) === null) found.delete(one)
    else found.add(one)
  }
  return [...found].sort()
}

export function foldersTouchedBy(change: Change): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of change.changed) {
    for (const at of ancestorsOf(one)) found.add(at)
    const now = edgesOf(change.root, one, change.after(one))
    const before = edgesOf(change.root, one, change.before(one))
    for (const target of new Set([...now, ...before])) {
      if (now.has(target) === before.has(target)) continue
      for (const at of reachedFolders(target, one)) found.add(at)
    }
  }
  return found
}

function enteringOf(change: Change): (folder: string, path: string) => boolean {
  const now = new Map<string, ReadonlySet<string>>()
  for (const one of change.changed) now.set(one, edgesOf(change.root, one, change.after(one)))
  return (folder, path) => {
    const from = new Set<string>(importersOf(change.root, path))
    for (const [one, edges] of now) {
      if (edges.has(path)) from.add(one)
      else from.delete(one)
    }
    for (const one of from) {
      if (!one.startsWith(`${folder}/`)) return true
    }
    return false
  }
}

export function folderMatchesAShape(change: Change, shadow: Shadow): readonly Judged[] {
  const shapes = shapesIn(change.root, shadow.reading)
  const pageTypes = pageTypesIn(shadow.reading)
  const fileProperties = filePropertiesAt(shadow.reading)
  let known: Known | null = null
  const admits = new Map<string, ReadonlySet<string>>()
  const extending = (pageTypeSlug: string, wanted: string): boolean => {
    let held = admits.get(wanted)
    if (held === undefined) {
      if (known === null) known = knownIn(shadow.reading, change.root, shadow.pageOf)
      held = new Set<string>(known.admitting(wanted))
      admits.set(wanted, held)
    }
    return held.has(pageTypeSlug)
  }
  const files = standingFiles(shadow.reading, change)
  const entering = enteringOf(change)
  const found: Judged[] = []
  for (const folder of [...foldersTouchedBy(change)].sort()) {
    const here = files.filter((one) => folderOf(one) === folder)
    if (here.length === 0) continue
    const deep = files.filter((one) => one.startsWith(`${folder}/`) && folderOf(one) !== folder)
    const held = here.map((one) => heldIn(one, pageTypes, fileProperties))
    const standing: Standing = {
      folder,
      files: here,
      deep,
      pages: held.filter((one) => one.kind === "page"),
      properties: held.filter((one) => one.kind === "property"),
      strays: held.filter((one) => one.kind === "stray"),
      entered: (path) => entering(folder, path),
      extending,
    }
    const said = shapes.map((one) => ({ slug: one.slug, reasons: one.judge(standing) }))
    if (said.some((one) => one.reasons.length === 0)) continue
    const why = said.map((one) => `as ${one.slug}, ${one.reasons.join(" and ")}`).join("; ")
    found.push({ path: folder, reason: `this folder matches no folder shape — ${why}` })
  }
  return found
}
