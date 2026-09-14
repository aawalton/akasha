import { dirname, join } from "node:path"
import {
  calledIn,
  objectIn,
} from "akasha/code/workspaces/modules/package-manifest/package-manifest.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"
import type { Matching } from "akasha/pages/name-formats/modules/name-matching/name-matching.module.code.ts"
import { lowerKebabCase } from "akasha/pages/name-formats/pages/lower-kebab-case/lower-kebab-case.name-format.ts"
import { packageName } from "akasha/pages/name-places/pages/package-name.name-place.ts"

const WORKSPACE = "workspace"

const WORKSPACE_MANIFEST = "workspace-manifest"

const HERE = "."

const ROOT = ""

const EXPORTS = "exports"

const AT = "@"

const PARTED_BY = "/"

const CALLED = "the manifest calls this package"

const NO_MANIFEST = `the index names no file for \`${WORKSPACE_MANIFEST}\`, so no manifest is findable`

export type Package = {
  readonly folder: string
  readonly named: string
  readonly reached: ReadonlySet<string>
}

export type Manifest = {
  readonly folder: string
  readonly at: string
}

function reachedIn(folder: string, said: unknown): ReadonlySet<string> | null {
  if (typeof said === "string") return new Set([join(folder, said)])
  if (said === null || typeof said !== "object") return null
  const found = new Set<string>()
  for (const one of Object.values(said as Record<string, unknown>)) {
    if (typeof one === "string") found.add(join(folder, one))
  }
  return found
}

export function namingIn(folder: string, text: string): Package | null {
  const held = objectIn(text)
  if (held === null) return null
  const reached = reachedIn(folder, held[EXPORTS])
  if (reached === null) return null
  return { folder, named: calledIn(text) ?? folder, reached }
}

export function partsIn(named: string): readonly string[] | null {
  const parted = named.split(PARTED_BY)
  const scope = parted[0]
  if (scope === undefined) return null
  if (parted.length === 1) return [scope]
  const slug = parted[1]
  if (parted.length > 2 || slug === undefined || !scope.startsWith(AT)) return null
  return [scope.slice(AT.length), slug]
}

export function refusalOf(named: string, matching: Matching): string | null {
  const parts = partsIn(named)
  if (parts === null) return `${CALLED} \`${named}\`, which is no \`${packageName.slug}\``
  for (const one of parts) {
    if (matching(one)) continue
    return `${CALLED} \`${named}\`, whose \`${one}\` is not written in \`${lowerKebabCase.slug}\``
  }
  return null
}

export function manifestNamed(shadow: Shadow): string {
  const said = shadow.index.fileKeysAt().get(WORKSPACE_MANIFEST)
  if (said === undefined || said === null) throw new Error(NO_MANIFEST)
  return said
}

export function pagesOfKind(shadow: Shadow, kind: string): readonly string[] {
  const found = new Set(shadow.index.everyOfType(kind).map((one) => one.path))
  for (const under of shadow.index.kindsUnder(kind)) {
    if (under === kind) continue
    for (const one of shadow.index.everyOfType(under)) found.add(one.path)
  }
  return [...found].sort()
}

export function folderOf(path: string): string {
  const folder = dirname(path)
  return folder === HERE ? ROOT : folder
}

function manifestsAt(pages: readonly string[], manifest: string | null): readonly Manifest[] {
  if (manifest === null) return []
  return pages.map((path) => {
    const folder = folderOf(path)
    return { folder, at: join(folder, manifest) }
  })
}

export function manifestsIn(shadow: Shadow): readonly Manifest[] {
  const workspaces = pagesOfKind(shadow, WORKSPACE)
  return manifestsAt(workspaces, shadow.index.fileKeysAt().get(WORKSPACE_MANIFEST) ?? null)
}
