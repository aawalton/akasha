import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const notionUpdatesOther = {
  id: "01a06863-fbe9-7635-b1fe-46f0733246a8",
  pageTypeSlug: "email-rule-agent",
  slug: "notion-updates-other",
  title: "Notion updates other",
  matches: [
    { field: "from", comparison: "is", values: ["notify@updates.notion.so"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
