import { judgingEach, textsBy } from "../../../modules/change-walking/change-walking.module.code.ts"
import { declaring, refusedIn } from "./types-file-runs-nothing.code-check.decision.code.ts"

const TYPES_FILES = textsBy("types files", declaring)

export const typesFileRunsNothing = judgingEach(TYPES_FILES, (given) =>
  refusedIn(given.path, given.text)
)
