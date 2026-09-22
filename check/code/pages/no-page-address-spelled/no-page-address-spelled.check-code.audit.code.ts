import {
  found,
  type Judging,
} from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.code.ts"
import {
  commitIn,
  overEachText,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { pageTypesIn } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/page/index/modules/property-carrying/property-carrying.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"

function judgingOn(root: string): Judging {
  const facing = facingOn(root)
  return {
    pageTypes: pageTypesIn(root),
    generated: (path) => generatedIn(facing, path),
    listed: (pageTypeSlug, slug) => listedAt(root, pageTypeSlug, slug).length > 0,
  }
}

export function noPageAddressSpelled(root: string): readonly Judged[] {
  const judging = judgingOn(root)
  return overEachText(commitIn(root), (path, text) => found(judging, path, text))
}
