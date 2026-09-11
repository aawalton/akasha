import {
  exemptIn,
  reasonsIn,
} from "akasha/checks/code-checks/pages/file-length/file-length.code-check.decision.code.ts"
import {
  FILES,
  judgingEach,
} from "akasha/checks/modules/change-walking/change-walking.module.code.ts"

export const fileLength = judgingEach(FILES, (given, shadow) =>
  exemptIn(given.path, shadow) ? [] : reasonsIn(given.path, given.bytes.byteLength)
)
