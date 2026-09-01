import { dirname, join } from "node:path"
import {
  landingOf,
  specifiersIn,
} from "../../../code-system/code-specifier/code-specifier.module.code.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { filePropertiesAt } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  listedByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import { matchingIn } from "../../../pages-system/name-format/format-reaching/format-reaching.module.code.ts"
import { lowerKebabCase } from "../../../pages-system/name-format/lower-kebab-case/lower-kebab-case.name-format.ts"
import type { Matching } from "../../../pages-system/name-format/name-matching/name-matching.module.code.ts"
import { packageName } from "../../../pages-system/name-place/name-places/package-name.name-place.ts"
import { kindsUnder } from "../../../pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import {
  bodyOf,
  FILES,
  input,
  overEachFile,
  overEachText,
} from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"

const PACKAGE = "workspace-package"

const MANIFEST = "manifest"

const EXPORTS = "exports"

const NAME = "name"

const AT = "@"

const PARTED_BY = "/"

const SAID = "a package is reached only where its manifest names"

const CALLED = "the manifest calls this package"

const NO_MANIFEST = `the index names no file for \`${MANIFEST}\`, so no package's manifest is findable`

export type Package = {
  readonly folder: string
  readonly named: string
  readonly reached: ReadonlySet<string>
}

export type Standing = {
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

export function manifestIn(text: string): Record<string, unknown> | null {
  let said: unknown
  try {
    said = JSON.parse(text)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object") return null
  return said as Record<string, unknown>
}

function calledIn(held: Record<string, unknown>): string | null {
  const named = held[NAME]
  return typeof named === "string" ? named : null
}

export function namingIn(folder: string, text: string): Package | null {
  const held = manifestIn(text)
  if (held === null) return null
  const reached = reachedIn(folder, held[EXPORTS])
  if (reached === null) return null
  return { folder, named: calledIn(held) ?? folder, reached }
}

export function nameIn(text: string): string | null {
  const held = manifestIn(text)
  return held === null ? null : calledIn(held)
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
  const named = nameIn(text)
  if (named === null) return []
  const said = refusalOf(named, matching)
  return said === null ? [] : [said]
}

function manifestNamed(shadow: Shadow): string {
  const said = filePropertiesAt(shadow.reading).get(MANIFEST)
  if (said === undefined || said === null) throw new Error(NO_MANIFEST)
  return said
}

export function packagePagesIn(root: string, shadow: Shadow): readonly string[] {
  const found = new Set(everyOfType(shadow.reading, PACKAGE).map((one) => one.path))
  for (const kind of kindsUnder(root, PACKAGE, shadow.reading, shadow.pageOf)) {
    if (kind === PACKAGE) continue
    for (const one of everyOfType(shadow.reading, kind)) found.add(one.path)
  }
  return [...found].sort()
}

export function manifestsIn(root: string, shadow: Shadow): readonly Standing[] {
  const pages = packagePagesIn(root, shadow)
  if (pages.length === 0) return []
  const manifest = manifestNamed(shadow)
  return pages.map((path) => {
    const folder = dirname(path)
    return { folder, at: join(folder, manifest) }
  })
}

export function packagesIn(change: Change, standing: readonly Standing[]): readonly Package[] {
  const found: Package[] = []
  for (const one of standing) {
    const bytes = change.after(one.at)
    if (bytes === null) continue
    const held = namingIn(one.folder, bodyOf({ root: change.root, path: one.at, bytes }))
    if (held !== null) found.push(held)
  }
  return found
}

function within(folder: string, path: string): boolean {
  return path.startsWith(`${folder}/`)
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
  return (at) => listedByPath(shadow.reading, at).some((one) => one.path === at)
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

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const standing = manifestsIn(change.root, shadow)
  if (standing.length === 0) return []
  const at = new Set(standing.map((one) => one.at))
  const packages = packagesIn(change, standing)
  const page = pageIn(shadow)
  const formatting = matchingIn(change.root, shadow.codeAt)
  const reaching = overEachText((path, text) => reasonsIn(packages, path, text, page))
  return overEachFile(change, (given) =>
    at.has(given.path)
      ? nameReasonsIn(bodyOf(given), formatting(lowerKebabCase.slug))
      : reaching(given)
  )
}

export const packageReachedWhereNamed = input(FILES, refusalsIn)
