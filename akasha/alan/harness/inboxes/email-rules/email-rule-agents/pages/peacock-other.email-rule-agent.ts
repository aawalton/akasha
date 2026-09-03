import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const peacockOther = {
  id: "01a06863-fbe9-7752-9a74-0df3dac49450",
  pageTypeSlug: "email-rule-agent",
  slug: "peacock-other",
  title: "Peacock other",
  matches: [
    { field: "from", comparison: "is", values: ["no-reply@messaging.peacocktv.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
