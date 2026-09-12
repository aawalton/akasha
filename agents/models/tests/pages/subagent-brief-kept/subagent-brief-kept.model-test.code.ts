import {
  judgingOf,
  puttingOf,
} from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { subagentBriefKept as test } from "akasha/agents/models/tests/pages/subagent-brief-kept/subagent-brief-kept.model-test.ts"

const JUDGED = "No Commentary"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const subagentBriefKept = puttingOf(test.prompt, JUDGED)
