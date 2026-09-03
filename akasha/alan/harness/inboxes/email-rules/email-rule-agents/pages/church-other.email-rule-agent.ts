import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const churchOther = {
  id: "01a06863-fbe8-7f49-baea-57a4fa1b1c14",
  pageTypeSlug: "email-rule-agent",
  slug: "church-other",
  title: "Church other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["churchofjesuschrist.org"] },
    {
      field: "from",
      comparison: "is-not",
      values: [
        "noreply-finance@mail.churchofjesuschrist.org",
        "noreply-lcr@mail.churchofjesuschrist.org",
      ],
    },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["youth", "young women", "young men", "yw ", "ym ", "primary"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
