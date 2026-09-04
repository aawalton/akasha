import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const appleTestflightOther = {
  id: "01a06863-fbe8-7ac2-baa4-9db5a8305ebb",
  pageTypeSlug: "email-rule-agent",
  slug: "apple-testflight-other",
  title: "Apple testflight other",
  matches: [
    { field: "from", comparison: "is", values: ["testflight_no_reply@email.apple.com"] },
    {
      field: "subject",
      comparison: "does-not-contain",
      values: ["completed processing", "is now available to test"],
    },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
