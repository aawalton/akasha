import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const vanguardOther = {
  id: "01a06863-fbe9-7beb-b3e9-2216e374fd3b",
  type: "page-type/email-rule-agent",
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
  createdAt: "2026-09-03T17:49:38.153Z",
  updatedAt: "2026-09-15T16:48:26.000Z",
} as const satisfies EmailRuleAgent
