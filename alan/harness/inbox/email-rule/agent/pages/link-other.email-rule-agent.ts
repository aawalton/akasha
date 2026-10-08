import type { EmailRuleAgent } from "akasha/alan/harness/inbox/email-rule/agent/email-rule-agent.page-type.types.ts"

export const linkOther = {
  id: "01a06863-fbe9-715e-8c94-735511a5f944",
  type: "page-type/email-rule-agent",
  slug: "link-other",
  title: "Link other",
  matches: [
    { field: "from", comparison: "is", values: ["notifications@link.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
  createdAt: "2026-09-03T17:49:38.153Z",
  updatedAt: "2026-09-15T16:48:26.000Z",
} as const satisfies EmailRuleAgent
