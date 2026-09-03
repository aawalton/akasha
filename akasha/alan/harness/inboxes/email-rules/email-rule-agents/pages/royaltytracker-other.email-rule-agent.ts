import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const royaltytrackerOther = {
  id: "01a06863-fbe9-783a-89c4-f5e4918a3524",
  pageTypeSlug: "email-rule-agent",
  slug: "royaltytracker-other",
  title: "Royaltytracker other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["royaltytracker.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["statement"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
