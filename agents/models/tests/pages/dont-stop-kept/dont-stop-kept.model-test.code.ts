import {
  judgingOf,
  puttingOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { dontStopKept as test } from "akasha/agents/models/tests/pages/dont-stop-kept/dont-stop-kept.model-test.ts"

const JUDGED = "Don't Stop!"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const dontStopKept = puttingOf(test.prompt, JUDGED, test.slug)
