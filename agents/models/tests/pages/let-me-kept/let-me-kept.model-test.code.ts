import {
  judgingOf,
  puttingOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { letMeKept as test } from "akasha/agents/models/tests/pages/let-me-kept/let-me-kept.model-test.ts"

const JUDGED = "Don't Stop!"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const letMeKept = puttingOf(test.prompt, JUDGED, test.slug)
