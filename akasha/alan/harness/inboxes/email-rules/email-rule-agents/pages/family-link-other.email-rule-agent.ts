import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const familyLinkOther = {
  id: "01a06863-fbe9-74e9-a0dd-8933309fbd22",
  pageTypeSlug: "email-rule-agent",
  slug: "family-link-other",
  title: "Family link other",
  matches: [
    { field: "from", comparison: "is", values: ["families-noreply@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: [
        "activity",
        "weekly report",
        "weekly summary",
        "oak.hills.first.ward.tech",
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
