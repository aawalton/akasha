import { dirname, join } from "node:path"
import { folderOf } from "akasha/code/path-between/code-path-between.module.code.ts"
import {
  pageOf,
  partedIn,
  secretNamed,
  uncommittedNamed,
} from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  extensionsFor,
  heldNamed,
} from "akasha/pages/indexes/extension-carrying/extension-carrying.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

const TS = ".ts"

export const UNCLAIMED =
  "no page claims this file — name its property on the page beside it or on that page's type"

export type Claiming = (path: string) => boolean

export function reservedBeside(path: string): string | null {
  if (!uncommittedNamed(path) && !secretNamed(path)) return null
  const said = partedIn(path)
  return said === null ? null : join(dirname(path), `${pageOf(said)}${TS}`)
}

export function claimingIn(shadow: Shadow): Claiming {
  const held = new Map<string, boolean>()
  const filed = (at: string): boolean => shadow.index.listedByPath(at).length > 0
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
