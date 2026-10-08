import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const icloudOther = {
  id: "01a06863-fbe9-722d-b3fd-000449f81109",
  type: "page-type/email-rule-agent",
  slug: "icloud-other",
  title: "Icloud other",
  matches: [
    { field: "from", comparison: "is", values: ["noreply@email.apple.com"] },
    { field: "subject", comparison: "does-not-contain", values: ["icloud storage"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
  createdAt: "2026-09-03T17:49:38.153Z",
  updatedAt: "2026-09-15T16:48:26.000Z",
} as const satisfies EmailRuleAgent
