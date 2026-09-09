import type { Reach, Work } from "@akasha/pages/computed-property"
import type { WorkedLearnEverythingTopic } from "../learn-everything-topic.page-type.worked.ts"

const UNDER = "topic-part-of"

type Beneath = { readonly coverage?: number }

type Rung = { readonly rank?: number }

function rankOf(page: WorkedLearnEverythingTopic, reach: Reach): number {
  const said: unknown = page.masteryLevel
  if (typeof said !== "string") return 0
  const rank = reach.target<Rung>(said)?.rank
  return typeof rank === "number" && Number.isFinite(rank) ? rank : 0
}

export const work: Work<WorkedLearnEverythingTopic, number> = (page, reach) => {
  const rank = rankOf(page, reach)
  const under = reach.naming<Beneath>(UNDER)
  if (under.length === 0) return rank
  let total = 0
  for (const one of under) total += one.coverage ?? 0
  return 0.5 * rank + 0.5 * (total / under.length)
}
