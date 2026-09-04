import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const meetupOther = {
  id: "01a06863-fbe9-7042-bae1-6c53948ec4f3",
  pageTypeSlug: "email-rule-agent",
  slug: "meetup-other",
  title: "Meetup other",
  matches: [
    { field: "from", comparison: "is", values: ["info@meetup.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["suggestions", "this week", "recommended", "groups for you", "groups near you"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
