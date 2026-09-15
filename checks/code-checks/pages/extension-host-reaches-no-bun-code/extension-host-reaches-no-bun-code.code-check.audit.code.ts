import {
  type Indexing,
  manifestIn,
  refusalsOver,
} from "akasha/checks/code-checks/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { fileKeysAt } from "akasha/pages/index/modules/entries/index-entries.module.code.ts"
import { carryingOf } from "akasha/pages/index/modules/property-carrying/property-carrying.module.code.ts"
import {
  readingIn,
  valueByPath,
} from "akasha/pages/index/modules/reading/index-reading.module.code.ts"

export function indexing(root: string): Indexing {
  const reading = readingIn(root)
  return {
    carryingOf: (named) => carryingOf(reading, named),
    valueAt: (path) => valueByPath(reading, path),
    fileKeysAt: () => fileKeysAt(reading),
  }
}

export function extensionHostReachesNoBunCode(root: string): readonly Judged[] {
  const change = everythingIn(root)
  return refusalsOver(change, change.changed, manifestIn(indexing(root)))
}
