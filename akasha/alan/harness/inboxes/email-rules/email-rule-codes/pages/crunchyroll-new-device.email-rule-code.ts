import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const crunchyrollNewDevice = {
  id: "01a06860-54a2-7fb2-b0e6-f034557b9bbc",
  pageTypeSlug: "email-rule-code",
  slug: "crunchyroll-new-device",
  title: "Crunchyroll new device",
  matches: [
    { field: "from", comparison: "ends-with", values: ["crunchyroll.com"] },
    {
      field: "subject",
      comparison: "contains",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  filing: "archive",
} as const satisfies EmailRuleCode
