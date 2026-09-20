import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const koFiMarketing = {
  id: "01a0bc9b-0459-7fef-9238-99a36aee89e5",
  type: "page-type/email-rule-code",
  slug: "ko-fi-marketing",
  title: "Ko-fi marketing",
  matches: [{ field: "from", comparison: "is", values: ["hello@ko-fi.com"] }],
  filing: "archive",
} as const satisfies EmailRuleCode
