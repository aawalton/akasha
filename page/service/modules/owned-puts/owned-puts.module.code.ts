import { ENTRY_PROPERTY } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { writerRefused } from "akasha/page/modules/entry-writing/page-entry-writing.module.code.ts"
import { partedIn, sectionedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  type Carried,
  propertiesIfNamed,
  type Source,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

function ownerOf(path: string, source: () => Source): Carried | null {
  const said = partedIn(path)
  const held = said === null ? null : sectionedIn(said)
  if (said === null || held === null) return null
  const carried = propertiesIfNamed(said.pageType, source()) ?? []
  const found = carried.find(
    (one) => one.pageTypeSlug === ENTRY_PROPERTY && one.propertySlug === held.propertySlug
  )
  return found ?? null
}

export function ownedRefused(
  root: string,
  paths: readonly string[],
  writtenBy: string | null
): string | null {
  let made: Source | null = null
  const source = (): Source => {
    made ??= sourceFor(root)
    return made
  }
  for (const path of paths) {
    const one = ownerOf(path, source)
    if (one === null || one.writtenBy === undefined || one.writtenBy === writtenBy) continue
    return writerRefused(one)
  }
  return null
}
