import { NAMING_NONE, type Naming } from "@akasha/code/code-specifier"
import { edgesIn } from "@akasha/indexes/import"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import {
  bodyOf,
  FILES,
  input,
  textIn,
  textNamed,
} from "../../../modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { judgingOver } from "./folder-matches-a-shape.code-check.decision.code.ts"
import {
  ancestorsOf,
  type Grouped,
  groupedOver,
  reachedFolders,
} from "./modules/folder-grouping/folder-grouping.module.code.ts"
import { answeringTo, type Holds } from "./modules/folder-naming/folder-naming.module.code.ts"

const ROOT = ""

export function edgesOf(
  root: string,
  path: string,
  bytes: Uint8Array | null,
  naming: Naming = NAMING_NONE
): ReadonlySet<string> {
  if (bytes === null || !textNamed(path)) return new Set<string>()
  return new Set<string>(edgesIn(bodyOf({ root, path, bytes }), path, naming))
}

export function foldersAbove(change: Change): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of change.changed) {
    for (const at of ancestorsOf(one)) found.add(at)
  }
  return found
}

export function foldersTouchedBy(
  change: Change,
  naming: Naming = NAMING_NONE
): ReadonlySet<string> {
  const found = new Set<string>(foldersAbove(change))
  for (const one of change.changed) {
    const now = edgesOf(change.root, one, change.after(one), naming)
    const before = edgesOf(change.root, one, change.before(one), naming)
    for (const target of new Set([...now, ...before])) {
      if (now.has(target) === before.has(target)) continue
      for (const at of reachedFolders(target, one)) found.add(at)
    }
  }
  return found
}

export function foldersJudgedBy(
  change: Change,
  naming: Naming,
  grouped: Grouped,
  holds: Holds,
  heldNames: ReadonlySet<string>
): ReadonlySet<string> {
  const found = new Set<string>(foldersTouchedBy(change, naming))
  for (const above of foldersAbove(change)) {
    for (const under of answeringTo(above, grouped, holds, heldNames)) found.add(under)
  }
  if (change.changed.length > 0) found.add(ROOT)
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const grouped = groupedOver(shadow.index, change)
  const judging = judgingOver({
    root: change.root,
    shadow,
    grouped,
    textAt: (path) => textIn(change, path),
  })
  const folders = foldersJudgedBy(change, judging.naming, grouped, judging.holds, judging.heldNames)
  return judging.refusalsAt(folders)
}

export const folderMatchesAShape = input(FILES, refusalsIn)
