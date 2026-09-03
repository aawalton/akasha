import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const happysAlexisMisdirect = {
  id: "01a06860-54a2-78d2-a82a-6b05b3732005",
  pageTypeSlug: "email-rule-code",
  slug: "happys-alexis-misdirect",
  title: "Happys alexis misdirect",
  matches: [{ field: "from", comparison: "ends-with", values: ["happysnation.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
