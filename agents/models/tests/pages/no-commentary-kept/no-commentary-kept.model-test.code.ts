import { judgingOf } from "akasha/agents/models/tests/pages/directive-kept/directive-kept.model-test.code.ts"
import { noCommentaryKept as test } from "akasha/agents/models/tests/pages/no-commentary-kept/no-commentary-kept.model-test.ts"

const JUDGED = "No Commentary"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)
