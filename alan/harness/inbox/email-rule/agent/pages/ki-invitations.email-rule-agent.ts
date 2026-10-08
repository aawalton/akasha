import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const kiInvitations = {
  id: "01a06863-fbe9-7521-bad8-0f83083e8cda",
  type: "page-type/email-rule-agent",
  slug: "ki-invitations",
  title: "Ki invitations",
  matches: [{ field: "from", comparison: "is", values: ["rkigoff@gmail.com"] }],
  judgement:
    "**Accept every invitation Ki Goff sends Alan, then archive it.**\n\nAccepting is reversible, so a yes given in advance commits the default and never the outcome. Jen is invited on her own address and answers for herself. A clash with his calendar goes to him.",
  createdAt: "2026-09-03T17:49:38.153Z",
  updatedAt: "2026-09-15T16:48:26.000Z",
} as const satisfies EmailRuleAgent
