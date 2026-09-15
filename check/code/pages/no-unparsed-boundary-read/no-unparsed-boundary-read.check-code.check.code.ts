import { reasonsFor } from "akasha/check/code/pages/no-unparsed-boundary-read/no-unparsed-boundary-read.check-code.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const noUnparsedBoundaryRead = judgingEach(TEXTS, (given) =>
  reasonsFor(given.path, given.text)
)
