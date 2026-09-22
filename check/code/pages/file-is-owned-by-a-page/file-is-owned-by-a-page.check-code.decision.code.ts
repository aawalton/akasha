import type { Body } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Answering } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import type {
  ExtensionsBy,
  FilePropertiesBy,
  FoldersBy,
} from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  claimantOf,
  type Listing,
  type Paging,
  pagingBy,
} from "akasha/page/index/modules/path-claiming/path-claiming.module.code.ts"
import { underIndex } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { heldPerShadow, type Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

export const UNOWNED = "belongs to no page, so nothing says what this file is for"

export type Claiming = {
  readonly paging: Paging
  readonly pageTypes: ReadonlySet<string>
  readonly fileProperties: FilePropertiesBy
  readonly folders: FoldersBy
  readonly extensions: ExtensionsBy
}

export function claimingOver(listed: Listing, index: Answering): Claiming {
  return {
    paging: pagingBy(listed),
    pageTypes: index.pageTypesIn(),
    fileProperties: index.filePropertiesAt(),
    folders: index.folderPropertiesAt(),
    extensions: index.extensionPropertiesAt(),
  }
}

const claimingIn = heldPerShadow(
  (shadow: Shadow): Claiming => claimingOver((folder) => shadow.listed(folder), shadow.index)
)

function ownedBy(held: Claiming, path: string): string | null {
  return claimantOf(
    held.paging,
    path,
    held.pageTypes,
    held.fileProperties,
    held.folders,
    held.extensions
  )
}

export function ownerOf(path: string, shadow: Shadow): string | null {
  return ownedBy(claimingIn(shadow), path)
}

export function reasonsOver(held: Claiming, path: string): readonly string[] {
  if (underIndex(path)) return []
  return ownedBy(held, path) === null ? [UNOWNED] : []
}

export function reasonsFor(path: string, shadow: Shadow): readonly string[] {
  return reasonsOver(claimingIn(shadow), path)
}

export function judgedIn(given: Body, shadow: Shadow): readonly string[] {
  return reasonsFor(given.path, shadow)
}
