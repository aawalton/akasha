import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const tplinkOther = {
  id: "01a06863-fbe9-7be0-9875-fa479d38723b",
  pageTypeSlug: "email-rule-agent",
  slug: "tplink-other",
  title: "Tplink other",
  matches: [
    { field: "from", comparison: "is", values: ["no-reply@email.tp-link.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
