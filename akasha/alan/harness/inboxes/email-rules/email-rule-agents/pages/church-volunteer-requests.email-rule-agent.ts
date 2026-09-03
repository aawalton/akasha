import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const churchVolunteerRequests = {
  id: "01a06863-fbe8-7b79-8976-f751b06848ea",
  pageTypeSlug: "email-rule-agent",
  slug: "church-volunteer-requests",
  title: "Church volunteer requests",
  matches: [
    { field: "from", comparison: "is", values: ["noreply-lcr@mail.churchofjesuschrist.org"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["youth", "young women", "young men", "yw ", "ym ", "primary"],
    },
  ],
  judgement:
    "**Archive a broadcast asking for volunteer labour; surface the rest.**\n\nService sign-ups are archived; activities, socials and anything dated he might attend stay his. One sender carries both and no condition separates a labour ask from an invitation.",
} as const satisfies EmailRuleAgent
