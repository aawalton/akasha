import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const synchronyPaymentOther = {
  id: "01a06863-fbe9-76be-b152-44092cbf06ca",
  pageTypeSlug: "email-rule-agent",
  slug: "synchrony-payment-other",
  title: "Synchrony payment other",
  matches: [
    { field: "from", comparison: "is", values: ["customer.service@servicing.synchrony.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["payment has processed", "automatic payment"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
