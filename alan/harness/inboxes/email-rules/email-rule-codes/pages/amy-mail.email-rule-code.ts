import type { EmailRuleCode } from "../../codes/email-rule-code.page-type.types.ts"

export const amyMail = {
  id: "01a06860-54a2-75d5-93c3-200f439f4722",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
  slug: "amy-mail",
  title: "Amy mail",
  matches: [{ field: "from", comparison: "is", values: ["amy@alanwalton.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
