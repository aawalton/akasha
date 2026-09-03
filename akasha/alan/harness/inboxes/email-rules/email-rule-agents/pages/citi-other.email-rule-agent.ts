import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const citiOther = {
  id: "01a06863-fbe8-7b8a-97b6-50bffdd8fd19",
  pageTypeSlug: "email-rule-agent",
  slug: "citi-other",
  title: "Citi other",
  matches: [
    { field: "from", comparison: "is", values: ["alerts@info6.citi.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["statement"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
