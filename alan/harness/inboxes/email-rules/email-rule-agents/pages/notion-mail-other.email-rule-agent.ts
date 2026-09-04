import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const notionMailOther = {
  id: "01a06863-fbe9-756b-8628-3eeedd49ca85",
  pageTypeSlug: "email-rule-agent",
  slug: "notion-mail-other",
  title: "Notion mail other",
  matches: [
    { field: "from", comparison: "is", values: ["notify@mail.notion.so"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
