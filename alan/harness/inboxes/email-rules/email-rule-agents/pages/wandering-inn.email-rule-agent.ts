import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const wanderingInn = {
  id: "01a06863-fbe9-7867-a6d3-481549d39ef3",
  pageTypeSlug: "email-rule-agent",
  slug: "wandering-inn",
  title: "Wandering inn",
  matches: [{ field: "from", comparison: "ends-with", values: ["wanderinginn.com"] }],
  judgement:
    "**Archive a chapter release; surface everything else from the site.**\n\nHe reads chapters on the site rather than in mail, so the notice is a duplicate of something he already has. Vault openings, pre-orders and claims are his to see. No subject separates them yet.",
} as const satisfies EmailRuleAgent
