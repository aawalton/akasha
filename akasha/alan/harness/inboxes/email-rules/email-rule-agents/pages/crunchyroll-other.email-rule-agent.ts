import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const crunchyrollOther = {
  id: "01a06863-fbe8-76a7-a1d5-71039852f17d",
  pageTypeSlug: "email-rule-agent",
  slug: "crunchyroll-other",
  title: "Crunchyroll other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["crunchyroll.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
