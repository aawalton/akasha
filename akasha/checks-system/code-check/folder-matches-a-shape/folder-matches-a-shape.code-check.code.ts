import { createRequire } from "node:module"
import { basename, join } from "node:path"
import { NAMING_NONE, type Naming } from "@akasha/code-system/code-specifier"
import { everyOfType, everyPath, importersOf, listedByPath } from "@akasha/indexes"
import { filePropertiesAt, pageTypesIn } from "@akasha/indexes/entries"
import { edgesIn } from "@akasha/indexes/import"
import { reachingIn } from "@akasha/indexes/package-reaching"
import { type Known, knownIn } from "@akasha/indexes/reaching"
import type { Reading } from "@akasha/indexes/shape"
import type { Change } from "@akasha/pages-system/change"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { besideAt, type Held, heldIn, namedIn } from "@akasha/pages-system/page-file-name"
import type { Shadow } from "@akasha/pages-system/shadow"
import { bodyOf, FILES, input, textIn } from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"
import type { Judging, Standing } from "./folder-shape/folder-shape.page-type.ts"

const SHAPE = "folder-shape"

const CODE = "code"

const TS = "ts"

const TS_ENDING = ".ts"

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

export function edgesOf(
  root: string,
  path: string,
  bytes: Uint8Array | null,
  naming: Naming = NAMING_NONE
): ReadonlySet<string> {
  if (bytes === null) return new Set<string>()
  return new Set<string>(edgesIn(bodyOf({ root, path, bytes }), path, naming))
}

export function shapesIn(root: string, shadow: Shadow): readonly Shape[] {
  const found: Shape[] = []
  for (const one of everyOfType(shadow.reading, SHAPE)) {
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
    const codePath = shadow.codeAt(beside)
    if (codePath === null) {
      throw new Error(
        `${one.path} is a folder shape, and this change leaves ${beside} holding a body no path on disk holds, so it cannot be loaded to judge by`
      )
    }
    let mod: Record<string, unknown>
    try {
      mod = loadFrom(join(root, codePath)) as Record<string, unknown>
    } catch (thrown) {
      throw new Error(
        `${one.path} is a folder shape, and ${codePath} could not be loaded — ${thrown instanceof Error ? thrown.message : String(thrown)}`
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

export function listedFiles(given: string | Reading, change: Change): readonly string[] {
  const found = new Set<string>(everyPath(given))
  for (const one of change.changed) {
    if (change.after(one) === null) found.delete(one)
    else found.add(one)
  }
  return [...found].sort()
}

export function foldersTouchedBy(
  change: Change,
  naming: Naming = NAMING_NONE
): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of change.changed) {
    for (const at of ancestorsOf(one)) found.add(at)
    const now = edgesOf(change.root, one, change.after(one), naming)
    const before = edgesOf(change.root, one, change.before(one), naming)
    for (const target of new Set([...now, ...before])) {
      if (now.has(target) === before.has(target)) continue
      for (const at of reachedFolders(target, one)) found.add(at)
    }
  }
  return found
}

function enteringOf(change: Change, naming: Naming): (folder: string, path: string) => boolean {
  const now = new Map<string, ReadonlySet<string>>()
  for (const one of change.changed) {
    now.set(one, edgesOf(change.root, one, change.after(one), naming))
  }
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

export function namesFiling(
  fileProperties: ReadonlyMap<string, string | null>
): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const [slug, fileName] of fileProperties) {
    if (fileName !== null) found.set(fileName, slug)
  }
  return found
}

export function pageNameOf(path: string): string {
  const name = basename(path)
  return name.endsWith(TS_ENDING) ? name.slice(0, -TS_ENDING.length) : name
}

export function claimedIn(
  held: Held,
  given: string | Reading,
  filing: ReadonlyMap<string, string>
): Held {
  if (held.kind !== "stray") return held
  const propertySlug = filing.get(basename(held.path))
  if (propertySlug === undefined) return held
  const claiming = listedByPath(given, held.path)[0]
  if (claiming === undefined) return held
  return {
    path: held.path,
    kind: "property",
    slug: null,
    pageTypeSlug: null,
    page: pageNameOf(claiming.path),
    propertySlug,
  }
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const shapes = shapesIn(change.root, shadow)
  const pageTypes = pageTypesIn(shadow.reading)
  const stated = filePropertiesAt(shadow.reading)
  const fileProperties = new Set<string>(stated.keys())
  const filing = namesFiling(stated)
  const naming = reachingIn(everyPath(shadow.reading), stated, (path) => textIn(change, path))
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
  const files = listedFiles(shadow.reading, change)
  const entering = enteringOf(change, naming)
  const found: Judged[] = []
  for (const folder of [...foldersTouchedBy(change, naming)].sort()) {
    const here = files.filter((one) => folderOf(one) === folder)
    if (here.length === 0) continue
    const deep = files.filter((one) => one.startsWith(`${folder}/`) && folderOf(one) !== folder)
    const held = here.map((one) =>
      claimedIn(heldIn(one, pageTypes, fileProperties), shadow.reading, filing)
    )
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

export const folderMatchesAShape = input(FILES, refusalsIn)
