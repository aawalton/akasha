import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const routineSenders = {
  id: "01a06860-54a2-768c-8854-85a9250c8498",
  type: "page-type/email-rule-code",
  slug: "routine-senders",
  title: "Routine senders",
  matches: [
    {
      field: "from",
      comparison: "ends-with",
      values: ["gatech.edu", "notify.incogni.com", "goodreads.com", "qualtrics-survey.com"],
    },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
