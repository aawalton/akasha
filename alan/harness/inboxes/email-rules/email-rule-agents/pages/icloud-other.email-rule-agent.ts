import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const icloudOther = {
  id: "01a06863-fbe9-722d-b3fd-000449f81109",
  pageTypeSlug: "email-rule-agent",
  slug: "icloud-other",
  title: "Icloud other",
  matches: [
    { field: "from", comparison: "is", values: ["noreply@email.apple.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["icloud storage"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
