import type { Body } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type {
  FilePropertiesBy,
  FoldersBy,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  claimantOf,
  type Paging,
  pagingOf,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { underIndex } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const UNOWNED = "belongs to no page, so nothing says what this file is for"

type Claiming = {
  readonly paging: Paging
  readonly pageTypes: ReadonlySet<string>
  readonly fileProperties: FilePropertiesBy
  readonly folders: FoldersBy
}

const claimingIn = heldPerShadow(
  (shadow: Shadow): Claiming => ({
    paging: pagingOf(shadow.index.everyOfType),
    pageTypes: shadow.index.pageTypesIn(),
    fileProperties: shadow.index.filePropertiesAt(),
    folders: shadow.index.folderPropertiesAt(),
  })
)

export function ownerOf(path: string, shadow: Shadow): string | null {
  const held = claimingIn(shadow)
  return claimantOf(held.paging, path, held.pageTypes, held.fileProperties, held.folders)
}

export function reasonsFor(path: string, shadow: Shadow): readonly string[] {
  if (underIndex(path)) return []
  return ownerOf(path, shadow) === null ? [UNOWNED] : []
}

export function judgedIn(given: Body, shadow: Shadow): readonly string[] {
  return reasonsFor(given.path, shadow)
}
