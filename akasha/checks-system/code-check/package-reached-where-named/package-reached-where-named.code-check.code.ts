import { dirname, join } from "node:path"
import {
  landingOf,
  specifiersIn,
} from "../../../code-system/code-specifier/code-specifier.module.code.ts"
import type { Change } from "../../../pages-system/change/change.module.code.ts"
import { filePropertiesAt } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import {
  everyOfType,
  standingByPath,
} from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import {
  bodyOf,
  overEachFile,
  overEachText,
} from "../../change-walking/change-walking.module.code.ts"
import type { Judged } from "../../judging/judging.module.code.ts"

const PACKAGE = "workspace-package"

const MANIFEST = "manifest"

const EXPORTS = "exports"

const NAME = "name"

const SAID = "a package is reached only where its manifest names"

const NO_MANIFEST = `the index names no file for \`${MANIFEST}\`, so no package's manifest is findable`

export type Package = {
  readonly folder: string
  readonly named: string
  readonly reached: ReadonlySet<string>
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
  let said: unknown
  try {
    said = JSON.parse(text)
  } catch {
    return null
  }
  if (said === null || typeof said !== "object") return null
  const held = said as Record<string, unknown>
  const reached = reachedIn(folder, held[EXPORTS])
  if (reached === null) return null
  const named = held[NAME]
  return { folder, named: typeof named === "string" ? named : folder, reached }
}

function manifestNamed(shadow: Shadow): string {
  const said = filePropertiesAt(shadow.reading).get(MANIFEST)
  if (said === undefined || said === null) throw new Error(NO_MANIFEST)
  return said
}

export function packagesIn(change: Change, shadow: Shadow): readonly Package[] {
  const pages = everyOfType(shadow.reading, PACKAGE)
  if (pages.length === 0) return []
  const manifest = manifestNamed(shadow)
  const found: Package[] = []
  for (const one of pages) {
    const folder = dirname(one.path)
    const at = join(folder, manifest)
    const bytes = change.after(at)
    if (bytes === null) continue
    const held = namingIn(folder, bodyOf({ root: change.root, path: at, bytes }))
    if (held !== null) found.push(held)
  }
  return found
}

function within(folder: string, path: string): boolean {
  return path.startsWith(`${folder}/`)
}

export function pageIn(shadow: Shadow): (at: string) => boolean {
  return (at) => standingByPath(shadow.reading, at).some((one) => one.path === at)
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
    for (const held of packages) {
      if (!within(held.folder, landed)) continue
      if (within(held.folder, path)) continue
      if (held.reached.has(landed)) continue
      said.push(
        `\`${one}\` reaches \`${landed}\`, which \`${held.named}\` does not name ` +
          `among its exports — ${SAID}`
      )
    }
  }
  return said
}

export function packageReachedWhereNamed(change: Change, shadow: Shadow): readonly Judged[] {
  const packages = packagesIn(change, shadow)
  if (packages.length === 0) return []
  const page = pageIn(shadow)
  return overEachFile(
    change,
    overEachText((path, text) => reasonsIn(packages, path, text, page))
  )
}
