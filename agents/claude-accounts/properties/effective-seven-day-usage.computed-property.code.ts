import type { Work } from "@akasha/pages/computed-property"
import type { WorkedClaudeAccount } from "../claude-account.page-type.worked.ts"

const CEILING = 100

function withdrawn(said: unknown): boolean {
  return typeof said === "string" && said !== ""
}

// A percent beside the page is read out of a file rather than out of the page's own text, so it
// reaches here as the text it was written as where it was written that way. The declared type
// says number, and this is the one place that difference is met.
function percentIn(said: unknown): number | null {
  if (typeof said === "number") return Number.isFinite(said) ? said : null
  if (typeof said !== "string" || said === "") return null
  const found = Number(said)
  return Number.isFinite(found) ? found : null
}

export const work: Work<WorkedClaudeAccount, number> = (page) => {
  if (withdrawn(page.subscriptionDisabledReason)) return CEILING
  return percentIn(page.sevenDayPercentUsed)
}
