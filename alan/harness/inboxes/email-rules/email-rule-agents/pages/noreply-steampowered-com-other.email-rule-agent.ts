import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const noreplySteampoweredComOther = {
  id: "01a06863-fbe9-78cc-9e0a-4ff1d5dedb14",
  pageTypeSlug: "email-rule-agent",
  slug: "noreply-steampowered-com-other",
  title: "Noreply steampowered com other",
  matches: [
    { field: "from", comparison: "is", values: ["noreply@steampowered.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: [
        "thank you for your purchase",
        "purchase receipt",
        "new device",
        "new sign-in",
        "new signin",
        "new login",
        "accessed from a new",
      ],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
