import {
  exemptIn,
  reasonsIn,
} from "akasha/check/code/pages/file-length/file-length.check-code.decision.code.ts"
import {
  FILES,
  judgingEach,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const fileLength = judgingEach(FILES, (given, shadow) =>
  exemptIn(given.path, shadow) ? [] : reasonsIn(given.path, given.bytes.byteLength)
)
