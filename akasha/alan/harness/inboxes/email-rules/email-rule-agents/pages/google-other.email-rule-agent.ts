import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const googleOther = {
  id: "01a06863-fbe9-777f-b6dd-3d682c8fa686",
  pageTypeSlug: "email-rule-agent",
  slug: "google-other",
  title: "Google other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["google.com"] },
    {
      field: "from",
      comparison: "is-not",
      values: [
        "googleplay-noreply@google.com",
        "payments-noreply@google.com",
        "cloudplatform-noreply@google.com",
        "noreply-dmarc-support@google.com",
        "families-noreply@google.com",
        "noreply-location-sharing@google.com",
      ],
    },
    { field: "subject", comparison: "does-not-contain", values: ["oak.hills.first.ward.tech"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
