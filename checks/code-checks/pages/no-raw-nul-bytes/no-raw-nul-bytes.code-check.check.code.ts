import { FILES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"
import { judgedIn } from "./no-raw-nul-bytes.code-check.decision.code.ts"

export const noRawNulBytes = judgingEach(FILES, judgedIn)
