import {
  found,
  type Judging,
} from "akasha/checks/code-checks/pages/no-page-address-spelled/no-page-address-spelled.code-check.decision.code.ts"
import { overEveryText } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import { pageTypesIn } from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"
import {
  facingOn,
  generatedIn,
} from "akasha/pages/indexes/modules/property-carrying/property-carrying.module.code.ts"

function judgingOn(root: string): Judging {
  const facing = facingOn(root)
  return {
    pageTypes: pageTypesIn(root),
    generated: (path) => generatedIn(facing, path),
  }
}

export function noPageAddressSpelled(root: string): readonly Judged[] {
  const judging = judgingOn(root)
  return overEveryText(root, (path, text) => found(judging, path, text))
}
