import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const jensInvitations = {
  id: "01a06863-fbe9-708d-acd8-3978be595aa5",
  type: "page-type/email-rule-agent",
  slug: "jens-invitations",
  title: "Jens invitations",
  matches: [
    { field: "from", comparison: "is", values: ["smilingjenny@gmail.com"] },
    { field: "subject", comparison: "contains", values: ["invitation:"] },
  ],
  judgement:
    "**Accept every invitation Jen sends Alan, then archive it.**\n\nTheir calendars should agree, so an invitation from her is a yes by default. It covers what she organizes and never an invitation she was merely sent. One already out of his inbox stays untouched.",
  createdAt: "2026-09-03T17:49:38.153Z",
  updatedAt: "2026-09-15T16:48:26.000Z",
} as const satisfies EmailRuleAgent
