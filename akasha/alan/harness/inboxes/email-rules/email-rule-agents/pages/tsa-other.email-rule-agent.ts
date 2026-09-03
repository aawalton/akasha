import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const tsaOther = {
  id: "01a06863-fbe9-7a21-92d1-45ee245e8673",
  pageTypeSlug: "email-rule-agent",
  slug: "tsa-other",
  title: "Tsa other",
  matches: [
    { field: "from", comparison: "is", values: ["donotreply@tsa.dhs.gov"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["survey", "feedback", "by clear"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
