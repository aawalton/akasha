import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const accountStatements = {
  id: "01a06860-54a1-734a-bad3-b2db41a22e61",
  type: "page-type/email-rule-code",
  slug: "account-statements",
  title: "Account statements",
  matches: [
    {
      field: "from",
      comparison: "is",
      values: [
        "alerts@info6.citi.com",
        "support@uccu.com",
        "noreply-finance@mail.churchofjesuschrist.org",
        "statements@mail.synchronybank.com",
        "support@betterment.com",
      ],
    },
    { field: "subject", comparison: "contains", values: ["statement"] },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.721Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
