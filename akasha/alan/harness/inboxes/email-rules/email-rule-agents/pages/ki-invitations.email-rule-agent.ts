import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const kiInvitations = {
  id: "01a06863-fbe9-7521-bad8-0f83083e8cda",
  pageTypeSlug: "email-rule-agent",
  slug: "ki-invitations",
  title: "Ki invitations",
  matches: [{ field: "from", comparison: "is", values: ["rkigoff@gmail.com"] }],
  judgement:
    "**Accept every invitation Ki Goff sends Alan, then archive it.**\n\nAccepting is reversible, so a standing yes commits the default and never the outcome. Jen is invited on her own address and answers for herself. A clash with his calendar goes to him.",
} as const satisfies EmailRuleAgent
