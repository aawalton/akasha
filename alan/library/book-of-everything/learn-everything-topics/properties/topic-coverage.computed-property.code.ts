import type { Reach, Work } from "@akasha/pages/computed-property"
import type { WorkedLearnEverythingTopic } from "../learn-everything-topic.page-type.worked.ts"

const UNDER = "topic-part-of-slugs"

type Beneath = { readonly coverage?: number }

type Rung = { readonly rank?: number }

// THE RANK SITS ON THE LEVEL PAGE RATHER THAN ON THE TOPIC, so the rank is reached across the page
// types by a qualified slug. A topic reaching no rung folds as the lowest rung folds, never throwing.
function rankOf(page: WorkedLearnEverythingTopic, reach: Reach): number {
  const said: unknown = page.masteryLevelSlug
  if (typeof said !== "string") return 0
  const rank = reach.target<Rung>(said)?.rank
  return typeof rank === "number" && Number.isFinite(rank) ? rank : 0
}

// EACH TOPIC BENEATH IS ASKED WHAT IT COVERS RATHER THAN FOLDED AGAIN HERE. One rung is written
// and the evaluator drives the rest, so no second descent can drift from this one.
export const work: Work<WorkedLearnEverythingTopic, number> = (page, reach) => {
  const rank = rankOf(page, reach)
  const under = reach.naming<Beneath>(UNDER)
  if (under.length === 0) return rank
  let total = 0
  for (const one of under) total += one.coverage ?? 0
  return 0.5 * rank + 0.5 * (total / under.length)
}
