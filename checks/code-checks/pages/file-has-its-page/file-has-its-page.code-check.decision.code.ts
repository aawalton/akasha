import { dirname, join } from "node:path"
import {
  pageOf,
  partedIn,
  secretNamed,
  uncommittedNamed,
} from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

const TS = ".ts"

export const UNCLAIMED =
  "no page claims this file — a move repoints nothing to it and its page's deletion leaves it behind"

export type Claiming = (path: string) => boolean

export function reservedBeside(path: string): string | null {
  if (!uncommittedNamed(path) && !secretNamed(path)) return null
  const said = partedIn(path)
  return said === null ? null : join(dirname(path), `${pageOf(said)}${TS}`)
}

export function claimingIn(shadow: Shadow): Claiming {
  return (path) => shadow.index.listedByPath(reservedBeside(path) ?? path).length > 0
}

export function unclaimedAt(path: string, claimed: Claiming): readonly string[] {
  if (claimed(path)) return []
  return [UNCLAIMED]
}
