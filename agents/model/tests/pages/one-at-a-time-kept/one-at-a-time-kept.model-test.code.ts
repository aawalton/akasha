import {
  judgingOf,
  puttingOf,
} from "akasha/agents/model/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { oneAtATimeKept as test } from "akasha/agents/model/tests/pages/one-at-a-time-kept/one-at-a-time-kept.model-test.ts"

const JUDGED = "One At A Time"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const oneAtATimeKept = puttingOf(test.prompt, JUDGED, test.slug)
