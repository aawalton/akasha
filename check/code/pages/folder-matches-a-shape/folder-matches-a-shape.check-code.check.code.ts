import { judgingOver } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.code.ts"
import {
  ancestorsOf,
  groupedOver,
  reachedFolders,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/folder-grouping/folder-grouping.module.code.ts"
import {
  bodyOf,
  FILES,
  input,
  textIn,
  textNamed,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { importsIn } from "akasha/code/reading/modules/code-importing/code-importing.module.code.ts"
import {
  NAMING_NONE,
  type Naming,
} from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { reachingOf } from "akasha/page/index/modules/package-reaching/package-reaching.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ROOT = ""

export function edgesOf(
  root: string,
  path: string,
  bytes: Uint8Array | null,
  naming: Naming = NAMING_NONE
): ReadonlySet<string> {
  if (bytes === null || !textNamed(path)) return new Set<string>()
  return new Set<string>(importsIn(bodyOf({ root, path, bytes }), path, naming))
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

export function foldersJudgedBy(change: Change, naming: Naming): ReadonlySet<string> {
  const found = new Set<string>(foldersTouchedBy(change, naming))
  if (change.changed.length > 0) found.add(ROOT)
  return found
}

function refusalsIn(change: Change, shadow: Shadow): readonly Judged[] {
  const facing = facingOn(change.root)
  const grouped = groupedOver(change, (path) => generatedIn(facing, path))
  const judging = judgingOver({ root: change.root, shadow, grouped })
  const stated = shadow.index.fileKeysAt()
  const naming = reachingOf(shadow.index.manifestsBeside(stated), (path) => textIn(change, path))
  return judging.refusalsAt(foldersJudgedBy(change, naming))
}

export const folderMatchesAShape = input(FILES, refusalsIn)
