import { reasonsFor } from "akasha/checks/code-checks/pages/no-unparsed-boundary-read/no-unparsed-boundary-read.code-check.decision.code.ts"
import {
  judgingEach,
  TEXTS,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const noUnparsedBoundaryRead = judgingEach(TEXTS, (given) =>
  reasonsFor(given.path, given.text)
)
