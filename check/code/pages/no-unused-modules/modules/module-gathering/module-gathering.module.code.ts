import { basename, dirname, join } from "node:path"
import {
  pageTypesFor,
  textIn,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import {
  pageNamed,
  pageOf,
  partedIn,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const MODULE = "module"

const TS = "ts"

const BESIDE = "."

export type Gathered = {
  readonly page: string
  readonly slug: string
  readonly files: readonly string[]
}

const foldersFor = heldPerShadow((shadow: Shadow): ReadonlyMap<string, readonly string[]> => {
  const found = new Map<string, string[]>()
  for (const path of shadow.listed()) {
    const at = dirname(path)
    const held = found.get(at)
    if (held === undefined) found.set(at, [path])
    else held.push(path)
  }
  return found
})

function pageFor(path: string): string | null {
  const said = partedIn(path)
  if (said === null || said.pageType !== MODULE) return null
  return join(dirname(path), `${pageOf(said)}${BESIDE}${TS}`)
}

function filesFor(shadow: Shadow, page: string, under: string): readonly string[] {
  const held = foldersFor(shadow).get(dirname(page)) ?? []
  const found = held.filter((one) => basename(one).startsWith(under))
  return found.includes(page) ? found : [...found, page]
}

export function modulesIn(change: Change, shadow: Shadow): readonly Gathered[] {
  const pageTypes = pageTypesFor(shadow)
  const found = new Map<string, Gathered>()
  for (const path of change.changed) {
    const page = pageFor(path)
    if (page === null || found.has(page)) continue
    const said = partedIn(page)
    if (said === null || !pageNamed(page, pageTypes)) continue
    if (textIn(change, page) === null) continue
    found.set(page, {
      page,
      slug: said.slug,
      files: filesFor(shadow, page, `${pageOf(said)}${BESIDE}`),
    })
  }
  return [...found.values()]
}
