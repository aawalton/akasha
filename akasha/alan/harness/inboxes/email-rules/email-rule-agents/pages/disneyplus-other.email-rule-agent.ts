import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const disneyplusOther = {
  id: "01a06863-fbe8-77d7-a886-6636105341a1",
  pageTypeSlug: "email-rule-agent",
  slug: "disneyplus-other",
  title: "Disneyplus other",
  matches: [
    { field: "from", comparison: "is", values: ["disneyplus@trx.mail2.disneyplus.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
