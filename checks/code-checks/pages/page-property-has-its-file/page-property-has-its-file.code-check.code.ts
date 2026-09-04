import { dirname, join } from "node:path"
import type { Answering } from "@akasha/indexes/answering"
import { type FilePropertiesBy, pathsOf } from "@akasha/indexes/entries"
import type { Change } from "@akasha/pages-system/change"
import { pageNamed } from "@akasha/pages-system/page-file-name"
import { valueIn } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"
import { bodyOf, FILES, input } from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"

const TS = ".ts"

export function pagesTouchedBy(
  change: Change,
  pageTypes: ReadonlySet<string>,
  index: Answering
): readonly string[] {
  const found = new Set<string>()
  for (const path of change.changed) {
    if (pageNamed(path, pageTypes)) found.add(path)
    for (const one of index.listedByPath(path)) found.add(one.path)
  }
  return [...found].sort()
}

export function tailOf(page: string, path: string): string {
  return path.slice(page.length - TS.length + 1)
}

export function namingOf(
  page: string,
  path: string,
  fileProperties: ReadonlyMap<string, string | null>
): string | null {
  for (const [slug, fileName] of fileProperties) {
    if (fileName !== null && join(dirname(page), fileName) === path) return slug
  }
  return null
}

export function statedBy(
  page: string,
  path: string,
  fileProperties: ReadonlyMap<string, string | null>
): string {
  const naming = namingOf(page, path, fileProperties)
  if (naming !== null) return `\`${naming}\``
  const tail = tailOf(page, path)
  const at = tail.indexOf(".")
  if (at === -1) return `\`${tail}\``
  return `\`${tail.slice(0, at)}: "${tail.slice(at + 1)}"\``
}

export function missingFor(
  change: Change,
  page: string,
  fileProperties: ReadonlyMap<string, string | null>,
  filedBy: FilePropertiesBy
): readonly Judged[] {
  const bytes = change.after(page)
  if (bytes === null) return []
  const value = valueIn(bodyOf({ root: change.root, path: page, bytes }))
  if (value === null) return []
  const said: Judged[] = []
  for (const one of pathsOf(value, page, change.root, filedBy)) {
    if (one === page) continue
    if (change.after(one) !== null) continue
    said.push({
      path: page,
      reason: `states ${statedBy(page, one, fileProperties)}, and no file stands at ${one}`,
    })
  }
  return said
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = shadow.index.pageTypesIn()
  const fileProperties = shadow.index.fileKeysAt()
  const filedBy = shadow.index.filePropertiesAt()
  const said: Judged[] = []
  for (const page of pagesTouchedBy(change, pageTypes, shadow.index)) {
    said.push(...missingFor(change, page, fileProperties, filedBy))
  }
  return said
}

export const pagePropertyHasItsFile = input(FILES, refusalsIn)
