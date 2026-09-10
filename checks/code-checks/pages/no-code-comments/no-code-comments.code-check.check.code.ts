import { BODIES, judgingEach } from "../../../modules/change-walking/change-walking.module.code.ts"
import { found } from "./no-code-comments.code-check.decision.code.ts"

export const noCodeComments = judgingEach(BODIES, (given) => found(given.path, given.text))
