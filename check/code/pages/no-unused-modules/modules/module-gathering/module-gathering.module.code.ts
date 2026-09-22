import { basename, dirname, join } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import {
  pageNamed,
  pageOf,
  partedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const MODULE = "module"

const TS = "ts"

const BESIDE = "."

export type Gathered = {
  readonly page: string
  readonly slug: string
  readonly files: readonly string[]
}

type Folders = ReadonlyMap<string, readonly string[]>

function foldersOf(listed: readonly string[]): Folders {
  const found = new Map<string, string[]>()
  for (const path of listed) {
    const at = dirname(path)
    const held = found.get(at)
    if (held === undefined) found.set(at, [path])
    else held.push(path)
  }
  return found
}

function pageFor(path: string): string | null {
  const said = partedIn(path)
  if (said === null || said.pageType !== MODULE) return null
  return join(dirname(path), `${pageOf(said)}${BESIDE}${TS}`)
}

function filesFor(folders: Folders, page: string, under: string): readonly string[] {
  const held = folders.get(dirname(page)) ?? []
  const found = held.filter((one) => basename(one).startsWith(under))
  return found.includes(page) ? found : [...found, page]
}

export function modulesIn(
  taken: readonly string[],
  listed: readonly string[],
  paged: Paged,
  read: (path: string) => string | null
): readonly Gathered[] {
  const pageTypes = paged.index.pageTypesIn()
  const folders = foldersOf(listed)
  const found = new Map<string, Gathered>()
  for (const path of taken) {
    const page = pageFor(path)
    if (page === null || found.has(page)) continue
    const said = partedIn(page)
    if (said === null || !pageNamed(page, pageTypes)) continue
    if (read(page) === null) continue
    found.set(page, {
      page,
      slug: said.slug,
      files: filesFor(folders, page, `${pageOf(said)}${BESIDE}`),
    })
  }
  return [...found.values()]
}
