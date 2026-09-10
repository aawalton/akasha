import { judgingEach, TEXTS } from "../../../modules/change-walking/change-walking.module.code.ts"
import { foundIn } from "./no-enum-or-namespace.code-check.decision.code.ts"

export const noEnumOrNamespace = judgingEach(TEXTS, (given) => foundIn(given.path, given.text))
