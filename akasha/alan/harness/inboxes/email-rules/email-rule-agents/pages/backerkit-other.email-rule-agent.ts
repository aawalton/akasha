import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const backerkitOther = {
  id: "01a06863-fbe8-79ff-9b14-76faf6830c13",
  pageTypeSlug: "email-rule-agent",
  slug: "backerkit-other",
  title: "Backerkit other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["backerkit.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: [
        "just launched",
        "now live",
        "launching",
        "live on backerkit",
        "live on vault",
        "new on vault",
        "now funding",
        "now on vault",
        "vault just backed",
        "vault backed",
        "back it now",
        "hours left to back",
        "days left to back",
      ],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
