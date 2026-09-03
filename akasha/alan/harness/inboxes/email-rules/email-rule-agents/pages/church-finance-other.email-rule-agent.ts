import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const churchFinanceOther = {
  id: "01a06863-fbe8-7e61-b27e-6ec3fa303a5c",
  pageTypeSlug: "email-rule-agent",
  slug: "church-finance-other",
  title: "Church finance other",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-finance@mail.churchofjesuschrist.org"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["statement", "youth", "young women", "young men", "yw ", "ym ", "primary"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
