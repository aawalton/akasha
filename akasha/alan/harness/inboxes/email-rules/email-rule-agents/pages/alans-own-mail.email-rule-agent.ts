import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const alansOwnMail = {
  id: "01a06863-fbe7-7d76-92af-261c8b41e5fb",
  pageTypeSlug: "email-rule-agent",
  slug: "alans-own-mail",
  title: "Alans own mail",
  matches: [
    { field: "from", comparison: "is", values: ["aawalton@gmail.com"] },
    { field: "to", comparison: "contains", values: ["aawalton@gmail.com"] },
  ],
  judgement:
    "**Do what Alan's mail to himself asks, then archive it; never send it back to him.**\n\nMail he sends himself reaches an agent, so it is a message rather than something to file. A note with no ask is judged like any other mail. What was done about it goes back to him as a reply.",
} as const satisfies EmailRuleAgent
