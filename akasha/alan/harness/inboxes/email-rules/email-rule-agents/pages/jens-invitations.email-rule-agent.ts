import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const jensInvitations = {
  id: "01a06863-fbe9-708d-acd8-3978be595aa5",
  pageTypeSlug: "email-rule-agent",
  slug: "jens-invitations",
  title: "Jens invitations",
  matches: [
    { field: "from", comparison: "is", values: ["smilingjenny@gmail.com"] },
    { field: "subject", comparison: "contains", values: ["invitation:"] },
  ],
  judgement:
    "**Accept every invitation Jen sends Alan, then archive it.**\n\nTheir calendars should agree, so an invitation from her is a yes by default. It covers what she organizes and never an invitation she was merely sent. One already out of his inbox stays untouched.",
} as const satisfies EmailRuleAgent
