import { dirname, join } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { textIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type {
  FilePropertiesBy,
  UncommittedBy,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  claimantOf,
  filesClaimedIn,
  type Listing,
  pagingBy,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { pageNamed, typeSlugIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"

const TS = ".ts"

export type Walking = {
  readonly root: string
  readonly paths: readonly string[]
  readonly read: (path: string) => string | null
  readonly holds: (path: string) => boolean
  readonly listed: Listing
}

export function walkingOver(change: Change, shadow: Shadow): Walking {
  return {
    root: change.root,
    paths: change.changed,
    read: (path) => textIn(change, path),
    holds: (path) => change.after(path) !== null,
    listed: shadow.listed,
  }
}

export function pagesTouchedIn(
  walking: Walking,
  pageTypes: ReadonlySet<string>,
  paged: Paged
): readonly string[] {
  const paging = pagingBy(walking.listed)
  const fileProperties = paged.index.filePropertiesAt()
  const folders = paged.index.folderPropertiesAt()
  const extensions = paged.index.extensionPropertiesAt()
  const kinds = new Set(pageTypes)
  for (const path of walking.paths) {
    const slug = typeSlugIn(path)
    if (slug !== null && walking.holds(path)) kinds.add(slug)
  }
  const found = new Set<string>()
  for (const path of walking.paths) {
    if (pageNamed(path, kinds)) found.add(path)
    const one = claimantOf(paging, path, kinds, fileProperties, folders, extensions)
    if (one !== null) found.add(one)
  }
  return [...found].sort()
}

function tailOf(page: string, path: string): string {
  return path.slice(page.length - TS.length + 1)
}

function namingOf(
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

function missingFor(
  walking: Walking,
  page: string,
  fileProperties: ReadonlyMap<string, string | null>,
  filedBy: FilePropertiesBy,
  withheld: UncommittedBy
): readonly Judged[] {
  const text = walking.read(page)
  if (text === null) return []
  const value = valueIn(text)
  if (value === null) return []
  const said: Judged[] = []
  for (const one of filesClaimedIn(value, page, walking.root, filedBy, withheld)) {
    if (one.at === page) continue
    if (one.uncommitted) continue
    if (walking.holds(one.at)) continue
    said.push({
      path: page,
      reason: `states ${statedBy(page, one.at, fileProperties)}, and no file stands at ${one.at}`,
    })
  }
  return said
}

export function refusalsIn(walking: Walking, paged: Paged): readonly Judged[] {
  const pageTypes = paged.index.pageTypesIn()
  const fileProperties = paged.index.fileKeysAt()
  const filedBy = paged.index.filePropertiesAt()
  const withheld = paged.index.uncommittedFiledAt()
  const said: Judged[] = []
  for (const page of pagesTouchedIn(walking, pageTypes, paged)) {
    said.push(...missingFor(walking, page, fileProperties, filedBy, withheld))
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  return refusalsIn(walkingOver(change, shadow), shadow)
}
