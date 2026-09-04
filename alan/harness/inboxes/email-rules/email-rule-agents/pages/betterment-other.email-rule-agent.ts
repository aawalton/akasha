import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const bettermentOther = {
  id: "01a06863-fbe8-7cc6-a93a-02ba58f523b8",
  pageTypeSlug: "email-rule-agent",
  slug: "betterment-other",
  title: "Betterment other",
  matches: [
    { field: "from", comparison: "is", values: ["support@betterment.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: [
        "statement",
        "new device",
        "new sign-in",
        "new signin",
        "new login",
        "accessed from a new",
      ],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
