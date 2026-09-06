import type { Work } from "@akasha/pages/computed-property"
import type { WorkedClaudeAccount } from "../claude-account.page-type.worked.ts"

const CEILING = 100

// A percent beside the page is read out of a file rather than out of the page's own text, so it
// reaches here as the text it was written as where it was written that way. The declared type
// says number, and this is the one place that difference is met.
function percentIn(said: unknown): number | null {
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

// THE WITHDRAWN SUBSCRIPTION IS NOT TESTED HERE. Reading `effectiveSevenDayUsage` rather than
// `sevenDayPercentUsed` is what makes that unnecessary: a withdrawn account reads 100 of its week,
// and a spent week is already a spent five hours. Testing it here as well would be the same rule
// in two places, which is what reading the sibling exists to stop.
export const work: Work<WorkedClaudeAccount, number> = (page) => {
  const seven = page.effectiveSevenDayUsage
  if (seven !== undefined && seven >= CEILING) return CEILING
  return percentIn(page.fiveHourPercentUsed)
}
