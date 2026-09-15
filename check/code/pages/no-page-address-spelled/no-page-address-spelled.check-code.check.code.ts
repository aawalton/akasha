import {
  found,
  judgingFor,
} from "akasha/check/code/pages/no-page-address-spelled/no-page-address-spelled.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noPageAddressSpelled = judgingEach(TEXTS, (given, shadow) =>
  found(judgingFor(shadow), given.path, given.text)
)
