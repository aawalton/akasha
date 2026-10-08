import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const wanderingInn = {
  id: "01a06863-fbe9-7867-a6d3-481549d39ef3",
  type: "page-type/email-rule-agent",
  slug: "wandering-inn",
  title: "Wandering inn",
  matches: [{ field: "from", comparison: "ends-with", values: ["wanderinginn.com"] }],
  judgement:
    "**Archive a chapter release; surface everything else from the site.**\n\nHe reads chapters on the site rather than in mail, so the notice is a duplicate of something he already has. Vault openings, pre-orders and claims are his to see. No subject separates them yet.",
  createdAt: "2026-09-03T17:49:38.153Z",
  updatedAt: "2026-09-15T16:48:26.000Z",
} as const satisfies EmailRuleAgent
