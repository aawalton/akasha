import type { EmailRuleAgent } from "../email-rule-agent.page-type.types.ts"

export const vanguardOther = {
  id: "01a06863-fbe9-7beb-b3e9-2216e374fd3b",
  pageTypeSlug: "email-rule-agent",
  type: "email-rule-agent",
  slug: "vanguard-other",
  title: "Vanguard other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["transactional.vanguard.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["transaction confirmation", "transaction submission", "statement"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
