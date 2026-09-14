import {
  judgingOf,
  puttingOf,
} from "akasha/agent/model/test/pages/directive-kept/directive-kept.model-test.code.ts"
import { dontStopKept as test } from "akasha/agent/model/test/pages/dont-stop-kept/dont-stop-kept.model-test.ts"

const JUDGED = "Don't Stop!"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const dontStopKept = puttingOf(test.prompt, JUDGED, test.slug)
