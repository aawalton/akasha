import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const renderOther = {
  id: "01a06863-fbe9-7ea4-b4f3-32f72e0abc8a",
  pageTypeSlug: "email-rule-agent",
  slug: "render-other",
  title: "Render other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["render.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["privacy", "policy", "terms", "user agreement", "upcoming changes"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
