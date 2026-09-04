import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const synchronyStatementOther = {
  id: "01a06863-fbe9-7891-911e-5469c95f75eb",
  pageTypeSlug: "email-rule-agent",
  slug: "synchrony-statement-other",
  title: "Synchrony statement other",
  matches: [
    { field: "from", comparison: "is", values: ["statements@mail.synchronybank.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["statement"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
