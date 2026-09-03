import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const enteIcloudOther = {
  id: "01a06863-fbe8-7bd3-906f-0de328c19021",
  pageTypeSlug: "email-rule-agent",
  slug: "ente-icloud-other",
  title: "Ente icloud other",
  matches: [
    {
      field: "from",
      comparison: "is",
      values: ["team_at_ente_io_b7yaz7z3n7v3t3_w5kx4729@icloud.com"],
    },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["new device", "new sign-in", "new signin", "new login", "accessed from a new"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
