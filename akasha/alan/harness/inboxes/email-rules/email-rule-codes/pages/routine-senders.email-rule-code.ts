import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const routineSenders = {
  id: "01a06860-54a2-768c-8854-85a9250c8498",
  pageTypeSlug: "email-rule-code",
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
} as const satisfies EmailRuleCode
