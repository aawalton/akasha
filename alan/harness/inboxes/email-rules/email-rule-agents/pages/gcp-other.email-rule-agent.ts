import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const gcpOther = {
  id: "01a06863-fbe9-7ae1-b4a1-79ba73d6bd94",
  pageTypeSlug: "email-rule-agent",
  slug: "gcp-other",
  title: "Gcp other",
  matches: [
    { field: "from", comparison: "is", values: ["cloudplatform-noreply@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["transition", "deprecat", "migrat", "oak.hills.first.ward.tech"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
