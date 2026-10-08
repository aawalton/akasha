import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const anthropicOther = {
  id: "01a06863-fbe8-7616-80df-997469fc71cd",
  type: "page-type/email-rule-agent",
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
  createdAt: "2026-09-03T17:49:38.152Z",
  updatedAt: "2026-09-15T16:48:26.000Z",
} as const satisfies EmailRuleAgent
