import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { foundIn } from "./no-method-signature.code-check.decision.code.ts"

export const noMethodSignature = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
