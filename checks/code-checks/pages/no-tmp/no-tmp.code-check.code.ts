import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { judgedIn } from "./no-tmp.code-check.decision.code.ts"

export const noTmp = judgingEach(TEXTS, (given, shadow) => judgedIn(given.path, given.text, shadow))
