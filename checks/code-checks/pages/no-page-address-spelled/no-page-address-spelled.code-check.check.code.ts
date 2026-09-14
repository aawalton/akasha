import {
  found,
  judgingFor,
} from "akasha/checks/code-checks/pages/no-page-address-spelled/no-page-address-spelled.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noPageAddressSpelled = judgingEach(TEXTS, (given, shadow) =>
  found(judgingFor(shadow), given.path, given.text)
)
