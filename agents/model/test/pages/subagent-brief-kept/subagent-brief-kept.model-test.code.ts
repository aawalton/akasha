import {
  judgingOf,
  puttingOf,
} from "akasha/agents/model/test/pages/directive-kept/directive-kept.model-test.code.ts"
import { subagentBriefKept as test } from "akasha/agents/model/test/pages/subagent-brief-kept/subagent-brief-kept.model-test.ts"

const JUDGED = "No Commentary"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const subagentBriefKept = puttingOf(test.prompt, JUDGED, test.slug)
