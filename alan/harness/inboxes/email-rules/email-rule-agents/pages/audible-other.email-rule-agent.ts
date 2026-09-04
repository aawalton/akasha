import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const audibleOther = {
  id: "01a06863-fbe8-7909-9a41-1d46921832ae",
  pageTypeSlug: "email-rule-agent",
  slug: "audible-other",
  title: "Audible other",
  matches: [
    { field: "from", comparison: "is", values: ["do-not-reply@audible.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["credit"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
