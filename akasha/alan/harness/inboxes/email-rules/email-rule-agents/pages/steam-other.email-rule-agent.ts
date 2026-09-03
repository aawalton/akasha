import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const steamOther = {
  id: "01a06863-fbe9-7a24-a9c0-bfa232813f2e",
  pageTypeSlug: "email-rule-agent",
  slug: "steam-other",
  title: "Steam other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["steampowered.com"] },
    { field: "from", comparison: "is-not", values: ["noreply@steampowered.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["thank you for your purchase", "purchase receipt"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
