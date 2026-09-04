import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const googlePaymentsOther = {
  id: "01a06863-fbe9-7e87-b74e-8ed56db7254f",
  pageTypeSlug: "email-rule-agent",
  slug: "google-payments-other",
  title: "Google payments other",
  matches: [
    { field: "from", comparison: "is", values: ["payments-noreply@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["received your payment", "oak.hills.first.ward.tech"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
