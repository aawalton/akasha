import {
  judgingOf,
  puttingOf,
} from "akasha/agents/model/test/pages/directive-kept/directive-kept.model-test.code.ts"
import { noCommentaryKept as test } from "akasha/agents/model/test/pages/no-commentary-kept/no-commentary-kept.model-test.ts"

const JUDGED = "No Commentary"

export const { asking, keeping } = judgingOf(test.prompt, JUDGED)

export const noCommentaryKept = puttingOf(test.prompt, JUDGED, test.slug)
