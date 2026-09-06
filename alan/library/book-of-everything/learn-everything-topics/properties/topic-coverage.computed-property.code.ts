import type { Work } from "@akasha/pages/computed-property"
import type { WorkedLearnEverythingTopic } from "../learn-everything-topic.page-type.worked.ts"

const UNDER = "topic-part-of-slugs"

type Beneath = { readonly coverage?: number }

// EACH TOPIC BENEATH IS ASKED WHAT IT COVERS RATHER THAN FOLDED AGAIN HERE. One rung is written
// and the evaluator drives the rest, so no second descent can drift from this one.
export const work: Work<WorkedLearnEverythingTopic, number> = (page, reach) => {
  const under = reach.naming<Beneath>(UNDER)
  if (under.length === 0) return page.depth
  let total = 0
  for (const one of under) total += one.coverage ?? 0
  return 0.5 * page.depth + 0.5 * (total / under.length)
}
