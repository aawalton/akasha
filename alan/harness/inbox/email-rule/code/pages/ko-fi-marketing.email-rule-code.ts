import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const koFiMarketing = {
  id: "01a0bc9b-0459-7fef-9238-99a36aee89e5",
  type: "page-type/email-rule-code",
  slug: "ko-fi-marketing",
  title: "Ko-fi marketing",
  matches: [{ field: "from", comparison: "is", values: ["hello@ko-fi.com"] }],
  filing: "archive",
  actions: ["unsubscribe"],
  createdAt: "2026-09-20T02:17:50.937Z",
  updatedAt: "2026-09-20T04:31:51.000Z",
} as const satisfies EmailRuleCode
