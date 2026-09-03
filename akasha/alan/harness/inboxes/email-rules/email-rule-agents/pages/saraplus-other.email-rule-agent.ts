import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const saraplusOther = {
  id: "01a06863-fbe9-76e9-8e88-696bdb668d97",
  pageTypeSlug: "email-rule-agent",
  slug: "saraplus-other",
  title: "Saraplus other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["saraplus.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["at&t order", "order summary", "order confirmation", "your order", "recent order"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
