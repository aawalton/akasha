import { dirname, join } from "node:path"
import { textIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Answering } from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import type {
  FilePropertiesBy,
  UncommittedBy,
} from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { filesClaimedIn } from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { valueIn } from "akasha/pages/value/page-value.module.code.ts"

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
  change: Change,
  page: string,
  fileProperties: ReadonlyMap<string, string | null>,
  filedBy: FilePropertiesBy,
  withheld: UncommittedBy
): readonly Judged[] {
  const text = textIn(change, page)
  if (text === null) return []
  const value = valueIn(text)
  if (value === null) return []
  const said: Judged[] = []
  for (const one of filesClaimedIn(value, page, change.root, filedBy, withheld)) {
    if (one.at === page) continue
    if (one.uncommitted) continue
    if (change.after(one.at) !== null) continue
    said.push({
      path: page,
      reason: `states ${statedBy(page, one.at, fileProperties)}, and no file stands at ${one.at}`,
    })
  }
  return said
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = shadow.index.pageTypesIn()
  const fileProperties = shadow.index.fileKeysAt()
  const filedBy = shadow.index.filePropertiesAt()
  const withheld = shadow.index.uncommittedFiledAt()
  const said: Judged[] = []
  for (const page of pagesTouchedBy(change, pageTypes, shadow.index)) {
    said.push(...missingFor(change, page, fileProperties, filedBy, withheld))
  }
  return said
}
