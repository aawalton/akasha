import { judgingOver } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.decision.code.ts"
import {
  ancestorsOf,
  type Grouped,
  groupedOver,
  reachedFolders,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import {
  answeringTo,
  type Holds,
} from "akasha/checks/code-checks/pages/folder-matches-a-shape/modules/folder-naming/folder-naming.module.code.ts"
import {
  bodyOf,
  FILES,
  input,
  textIn,
  textNamed,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { NAMING_NONE, type Naming } from "akasha/code/specifier/code-specifier.module.code.ts"
import { edgesIn } from "akasha/pages/indexes/import/index-import.index.code.ts"
import { reachingOf } from "akasha/pages/indexes/package-reaching/package-reaching.module.code.ts"
import type { Change } from "akasha/pages/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

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

function foldersAbove(change: Change): ReadonlySet<string> {
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
  const judging = judgingOver({ root: change.root, shadow, grouped })
  const stated = shadow.index.fileKeysAt()
  const naming = reachingOf(shadow.index.manifestsBeside(stated), (path) => textIn(change, path))
  const folders = foldersJudgedBy(change, naming, grouped, judging.holds, judging.heldNames)
  return judging.refusalsAt(folders)
}

export const folderMatchesAShape = input(FILES, refusalsIn)
