import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { reasonsFor } from "./no-unparsed-boundary-read.code-check.decision.code.ts"

export const noUnparsedBoundaryRead = judgingEach(TEXTS, (given) =>
  reasonsFor(given.path, given.text)
)
