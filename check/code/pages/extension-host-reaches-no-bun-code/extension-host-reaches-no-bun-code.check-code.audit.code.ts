import {
  type Indexing,
  manifestIn,
  refusalsOver,
} from "akasha/check/code/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.check-code.decision.code.ts"
import { everythingIn } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { fileKeysAt } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { carryingOf } from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import {
  readingIn,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"

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
