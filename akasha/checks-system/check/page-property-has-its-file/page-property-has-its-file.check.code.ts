import {
  filePropertiesAt,
  pageTypesIn,
  pathsOf,
  valueIn,
} from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import { standingByPath } from "../../../pages-system/indexes/index-reading/index-reading.module.code.ts"
import type { Reading } from "../../../pages-system/indexes/index-surface/index-surface.module.code.ts"
import { pageNamed } from "../../../pages-system/page/page-file-name/page-file-name.module.code.ts"
import type { Shadow } from "../../../pages-system/shadow/shadow.module.code.ts"
import { bodyOf } from "../../checking/checking.module.code.ts"
import type { Judged, Change } from "../../judging/judging.module.code.ts"

const INSIDE = "akasha/"

const TS = ".ts"

export function pagesTouchedBy(
  change: Change,
  pageTypes: ReadonlySet<string>,
  given: string | Reading
): readonly string[] {
  const found = new Set<string>()
  for (const path of change.changed) {
    if (!path.startsWith(INSIDE)) continue
    if (pageNamed(path, pageTypes)) found.add(path)
    for (const one of standingByPath(given, path)) {
      if (one.path.startsWith(INSIDE)) found.add(one.path)
    }
  }
  return [...found].sort()
}

export function tailOf(page: string, path: string): string {
  return path.slice(page.length - TS.length + 1)
}

export function statedBy(page: string, path: string): string {
  const tail = tailOf(page, path)
  const at = tail.indexOf(".")
  if (at === -1) return `\`${tail}\``
  return `\`${tail.slice(0, at)}: "${tail.slice(at + 1)}"\``
}

export function missingFor(
  change: Change,
  page: string,
  fileProperties: ReadonlySet<string>
): readonly Judged[] {
  const bytes = change.after(page)
  if (bytes === null) return []
  const text = bodyOf({ root: change.root, path: page, bytes })
  if (text === null) return []
  const value = valueIn(text)
  if (value === null) return []
  const said: Judged[] = []
  for (const one of pathsOf(value, page, change.root, fileProperties)) {
    if (one === page) continue
    if (change.after(one) !== null) continue
    said.push({ path: page, reason: `states ${statedBy(page, one)}, and no file stands at ${one}` })
  }
  return said
}

export function pagePropertyHasItsFile(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = pageTypesIn(shadow.reading)
  const fileProperties = filePropertiesAt(shadow.reading)
  const said: Judged[] = []
  for (const page of pagesTouchedBy(change, pageTypes, shadow.reading)) {
    said.push(...missingFor(change, page, fileProperties))
  }
  return said
}
