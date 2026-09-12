import { dirname, join } from "node:path"
import {
  bodyOf,
  overEachFile,
  overEachText,
  textIn,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { calledIn, objectIn } from "akasha/code/package-manifest/package-manifest.module.code.ts"
import { landingOf, specifiersIn } from "akasha/code/specifier/code-specifier.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { pageOf, partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { matchingIn } from "akasha/pages/name-formats/modules/format-reaching/format-reaching.module.code.ts"
import type { Matching } from "akasha/pages/name-formats/modules/name-matching/name-matching.module.code.ts"
import { lowerKebabCase } from "akasha/pages/name-formats/pages/lower-kebab-case/lower-kebab-case.name-format.ts"
import { packageName } from "akasha/pages/name-places/pages/package-name.name-place.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { types } from "akasha/pages/types/properties/types.file-property.ts"

const PACKAGE = "workspace-package"

const WORKSPACE = "workspace"

const WORKSPACE_MANIFEST = "workspace-manifest"

const HERE = "."

const ROOT = ""

const EXPORTS = "exports"

const AT = "@"

const PARTED_BY = "/"

const TS = ".ts"

const SAID = "a package is reached only where its manifest names"

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

function nameReasonsIn(text: string, matching: Matching): readonly string[] {
  const named = calledIn(text)
  if (named === null) return []
  const said = refusalOf(named, matching)
  return said === null ? [] : [said]
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

export function packagePagesIn(shadow: Shadow): readonly string[] {
  return pagesOfKind(shadow, PACKAGE)
}

export function folderOf(path: string): string {
  const folder = dirname(path)
  return folder === HERE ? ROOT : folder
}

export function manifestsAt(
  pages: readonly string[],
  manifest: string | null
): readonly Manifest[] {
  if (manifest === null) return []
  return pages.map((path) => {
    const folder = folderOf(path)
    return { folder, at: join(folder, manifest) }
  })
}

export function manifestsIn(shadow: Shadow): readonly Manifest[] {
  const pages = packagePagesIn(shadow)
  const held = pages.length === 0 ? [] : manifestsAt(pages, manifestNamed(shadow))
  const workspaces = pagesOfKind(shadow, WORKSPACE)
  const over = manifestsAt(workspaces, shadow.index.fileKeysAt().get(WORKSPACE_MANIFEST) ?? null)
  return [...held, ...over]
}

export function packagesIn(change: Change, standing: readonly Manifest[]): readonly Package[] {
  const found: Package[] = []
  for (const one of standing) {
    const text = textIn(change, one.at)
    if (text === null) continue
    const held = namingIn(one.folder, text)
    if (held !== null) found.push(held)
  }
  return found
}

function within(folder: string, path: string): boolean {
  if (folder === ROOT) return path !== ROOT
  return path.startsWith(`${folder}${PARTED_BY}`)
}

export function holdingIn(packages: readonly Package[], path: string): Package | null {
  let held: Package | null = null
  for (const one of packages) {
    if (!within(one.folder, path)) continue
    if (held === null || one.folder.length > held.folder.length) held = one
  }
  return held
}

export function pageIn(shadow: Shadow): (at: string) => boolean {
  const listed = (at: string): boolean =>
    shadow.index.listedByPath(at).some((one) => one.path === at)
  return (at) => {
    if (listed(at)) return true
    const said = partedIn(at)
    if (said === null || said.sections.length !== 1) return false
    if (said.sections[0] !== types.propertySlug) return false
    return listed(join(dirname(at), `${pageOf(said)}${TS}`))
  }
}

export function reasonsIn(
  packages: readonly Package[],
  path: string,
  text: string,
  page: (at: string) => boolean
): readonly string[] {
  const said: string[] = []
  for (const one of specifiersIn(path, text)) {
    const landed = landingOf(path, one)
    if (landed === null) continue
    if (page(landed)) continue
    const held = holdingIn(packages, landed)
    if (held === null) continue
    if (within(held.folder, path)) continue
    if (held.reached.has(landed)) continue
    said.push(
      `\`${one}\` reaches \`${landed}\`, which \`${held.named}\` does not name ` +
        `among its exports — ${SAID}`
    )
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const manifests = manifestsIn(shadow)
  if (manifests.length === 0) return []
  const at = new Set(manifests.map((one) => one.at))
  const packages = packagesIn(change, manifests)
  const page = pageIn(shadow)
  const formatting = matchingIn(change.root, shadow.index, shadow.codeAt)
  const reaching = overEachText((path, text) => reasonsIn(packages, path, text, page))
  return overEachFile(change, (given) =>
    at.has(given.path)
      ? nameReasonsIn(bodyOf(given), formatting(lowerKebabCase.slug))
      : reaching(given)
  )
}
