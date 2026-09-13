import { dirname, join } from "node:path"
import { folderOf } from "akasha/code/paths/modules/code-path-between/code-path-between.module.code.ts"
import {
  extensionsFor,
  heldNamed,
} from "akasha/pages/indexes/modules/extension-carrying/extension-carrying.module.code.ts"
import {
  claimantOf,
  type Listing,
} from "akasha/pages/indexes/modules/path-claiming/path-claiming.module.code.ts"
import { filesIn } from "akasha/pages/indexes/modules/tree-reading/tree-reading.module.code.ts"
import {
  pageOf,
  partedIn,
  secretNamed,
  uncommittedHeld,
} from "akasha/pages/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/modules/shadow/shadow.module.code.ts"

const TS = ".ts"

export const UNCLAIMED =
  "no page claims this file — name its property on the page beside it or on that page's type"

export type Claiming = (path: string) => boolean

export function reservedBeside(path: string): string | null {
  if (!uncommittedHeld(path) && !secretNamed(path)) return null
  const said = partedIn(path)
  return said === null ? null : join(dirname(path), `${pageOf(said)}${TS}`)
}

export function claimingIn(shadow: Shadow): Claiming {
  const listing: Listing = (folder) => filesIn(shadow.root, folder)
  const pageTypes = shadow.index.pageTypesIn()
  const fileProperties = shadow.index.filePropertiesAt()
  const folders = shadow.index.folderPropertiesAt()
  const held = new Map<string, boolean>()
  const filed = (at: string): boolean =>
    claimantOf(listing, at, pageTypes, fileProperties, folders) !== null
  const inside = (folder: string): boolean => {
    if (folder === "") return false
    const found = held.get(folder)
    if (found !== undefined) return found
    const made = filed(folder) || inside(folderOf(folder))
    held.set(folder, made)
    return made
  }
  const named = (path: string): boolean =>
    heldNamed(
      path,
      extensionsFor(shadow.index),
      () => true,
      (one) => shadow.index.carryingOf(one)
    )
  return (path) => filed(reservedBeside(path) ?? path) || inside(folderOf(path)) || named(path)
}

export function unclaimedAt(path: string, claimed: Claiming): readonly string[] {
  if (claimed(path)) return []
  return [UNCLAIMED]
}
