import { judgedIn } from "akasha/check/code/pages/file-is-owned-by-a-page/file-is-owned-by-a-page.check-code.decision.code.ts"
import {
  FILES,
  judgingEach,
} from "akasha/check/modules/change-walking/change-walking.module.code.ts"

export const fileIsOwnedByAPage = judgingEach(FILES, judgedIn)
