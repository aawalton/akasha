import {
  judgingOf,
  puttingOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { goingOnKept as test } from "akasha/agents/models/tests/pages/going-on-kept/going-on-kept.model-test.ts"

const JUDGED = "Don't Stop!"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const goingOnKept = puttingOf(test.prompt, JUDGED, test.slug)
