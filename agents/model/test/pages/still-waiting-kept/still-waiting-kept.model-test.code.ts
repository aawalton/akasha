import {
  judgingOf,
  puttingOf,
} from "akasha/agents/model/test/pages/directive-kept/directive-kept.model-test.code.ts"
import { stillWaitingKept as test } from "akasha/agents/model/test/pages/still-waiting-kept/still-waiting-kept.model-test.ts"

const JUDGED = "No Commentary"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const stillWaitingKept = puttingOf(test.prompt, JUDGED, test.slug)
