import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const enteOther = {
  id: "01a06863-fbe8-739f-8380-2beeb18955b2",
  pageTypeSlug: "email-rule-agent",
  slug: "ente-other",
  title: "Ente other",
  matches: [
    { field: "from", comparison: "is", values: ["team@ente.io"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
