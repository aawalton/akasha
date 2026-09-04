import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const jenOther = {
  id: "01a06863-fbe9-7fb8-b619-ad9f0045e94e",
  pageTypeSlug: "email-rule-agent",
  slug: "jen-other",
  title: "Jen other",
  matches: [
    { field: "from", comparison: "is", values: ["smilingjenny@gmail.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["invitation:"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
