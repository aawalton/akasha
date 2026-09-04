import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const googleplayOther = {
  id: "01a06863-fbe9-748b-8169-9d9472c4906c",
  pageTypeSlug: "email-rule-agent",
  slug: "googleplay-other",
  title: "Googleplay other",
  matches: [
    { field: "from", comparison: "is", values: ["googleplay-noreply@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: [
        "your google play order receipt",
        "privacy",
        "policy",
        "terms",
        "user agreement",
        "upcoming changes",
        "oak.hills.first.ward.tech",
      ],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
