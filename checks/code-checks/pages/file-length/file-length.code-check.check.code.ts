import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"
import { exemptIn, reasonsIn } from "./file-length.code-check.decision.code.ts"

export const fileLength = judgingEach(FILES, (given, shadow) =>
  exemptIn(given.path, shadow) ? [] : reasonsIn(given.path, given.bytes.byteLength)
)
