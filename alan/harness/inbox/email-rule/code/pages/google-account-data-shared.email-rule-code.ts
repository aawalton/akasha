import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const googleAccountDataShared = {
  id: "01a0e0f6-ecaf-7749-b56a-69d213d67ae0",
  type: "page-type/email-rule-code",
  slug: "google-account-data-shared",
  title: "Google account data shared",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-accounts@google.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["You shared some Google Account data with"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
