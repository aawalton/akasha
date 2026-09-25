import { basename } from "node:path"
import {
  type BuildFolder,
  buildFoldersIn,
  carriersIn,
  type Declared,
  declaredIn,
  refusalsOver,
} from "akasha/check/code/pages/build-folder-is-ignored/build-folder-is-ignored.check-code.decision.code.ts"
import {
  filesBy,
  input,
  pageTypesFor,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { buildFolderProperty } from "akasha/page/build-folder-property/build-folder-property.page-type.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed, partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const IGNORES_AT = ".gitignore"

function ignoring(path: string): boolean {
  return basename(path) === IGNORES_AT
}

function taken(path: string, shadow: Shadow): boolean {
  return ignoring(path) || pageNamed(path, pageTypesFor(shadow))
}

function sweeping(change: Change, shadow: Shadow): boolean {
  const kinds = shadow.index.kindsUnder(buildFolderProperty.slug)
  return change.changed.some((path) => ignoring(path) || kinds.has(partedIn(path)?.pageType ?? ""))
}

function valuesOver(
  change: Change,
  shadow: Shadow,
  folders: readonly BuildFolder[]
): ReadonlyMap<string, Value | null> {
  const types = pageTypesFor(shadow)
  const found = new Map<string, Value | null>()
  for (const path of change.changed) {
    if (pageNamed(path, types)) found.set(path, shadow.pageOf(path))
  }
  if (!sweeping(change, shadow)) return found
  for (const one of carriersIn(shadow.index, folders)) {
    if (found.has(one.path)) continue
    found.set(one.path, shadow.index.valuesByPath(one.pageTypeSlug).get(one.path) ?? null)
  }
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const folders = buildFoldersIn(shadow.index)
  const declared: Declared[] = []
  for (const [page, value] of valuesOver(change, shadow, folders)) {
    declared.push(...declaredIn(page, value, folders))
  }
  return refusalsOver(declared, (path) => textIn(change, path))
}

export const buildFolderIsIgnored = input(filesBy("pages and .gitignore files", taken), refusalsIn)
