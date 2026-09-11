import {
  type Indexing,
  manifestIn,
  refusalsOver,
} from "akasha/checks/code-checks/pages/extension-host-reaches-no-bun-code/extension-host-reaches-no-bun-code.code-check.decision.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { fileKeysAt } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

function indexing(root: string): Indexing {
  return {
    listedAt: (pageTypeSlug, slug) => listedAt(root, pageTypeSlug, slug),
    fileKeysAt: () => fileKeysAt(root),
  }
}

export function extensionHostReachesNoBunCode(root: string): readonly Judged[] {
  const change = everythingIn(root)
  return refusalsOver(change, change.changed, manifestIn(indexing(root)))
}
