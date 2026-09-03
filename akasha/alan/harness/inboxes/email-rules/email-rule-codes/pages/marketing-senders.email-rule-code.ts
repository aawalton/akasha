import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const marketingSenders = {
  id: "01a06860-54a2-7b07-8558-6dc9a9684e60",
  pageTypeSlug: "email-rule-code",
  slug: "marketing-senders",
  title: "Marketing senders",
  matches: [
    {
      field: "from",
      comparison: "ends-with",
      values: [
        "email.clearme.com",
        "info15.citi.com",
        "marketing.fitbod.app",
        "insights.united.com",
        "enews.united.com",
        "mkt.flyfrontier.com",
        "mkt.pacsun.com",
        "em1.cloudflare.com",
        "metamail.com",
        "uopeople.edu",
        "ins.amica.com",
      ],
    },
  ],
  filing: "archive",
  actions: ["unsubscribe"],
} as const satisfies EmailRuleCode
