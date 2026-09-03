import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const anthropicOther = {
  id: "01a06863-fbe8-7616-80df-997469fc71cd",
  pageTypeSlug: "email-rule-agent",
  slug: "anthropic-other",
  title: "Anthropic other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["mail.anthropic.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["secure link to", "your receipt from anthropic"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
