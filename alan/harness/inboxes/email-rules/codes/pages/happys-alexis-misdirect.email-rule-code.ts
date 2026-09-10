import type { EmailRuleCode } from "../email-rule-code.page-type.types.ts"

export const happysAlexisMisdirect = {
  id: "01a06860-54a2-78d2-a82a-6b05b3732005",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "happys-alexis-misdirect",
  title: "Happys alexis misdirect",
  matches: [{ field: "from", comparison: "ends-with", values: ["happysnation.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
