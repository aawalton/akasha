import {
  judgingOf,
  puttingOf,
} from "akasha/agent/model/test/pages/directive-kept/directive-kept.model-test.code.ts"
import { letMeKept as test } from "akasha/agent/model/test/pages/let-me-kept/let-me-kept.model-test.ts"

const JUDGED = "Don't Stop!"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const letMeKept = puttingOf(test.prompt, JUDGED, test.slug)
