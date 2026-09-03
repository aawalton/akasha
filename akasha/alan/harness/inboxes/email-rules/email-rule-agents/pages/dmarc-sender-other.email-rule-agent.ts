import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const dmarcSenderOther = {
  id: "01a06863-fbe8-7e8f-b007-0de759a54215",
  pageTypeSlug: "email-rule-agent",
  slug: "dmarc-sender-other",
  title: "Dmarc sender other",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-dmarc-support@google.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["report domain", "oak.hills.first.ward.tech"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
