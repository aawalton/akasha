import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const accountStatements = {
  id: "01a06860-54a1-734a-bad3-b2db41a22e61",
  pageTypeSlug: "email-rule-code",
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
} as const satisfies EmailRuleCode
