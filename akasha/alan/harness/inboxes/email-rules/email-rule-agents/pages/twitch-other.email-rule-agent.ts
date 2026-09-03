import type { EmailRuleAgent } from "../../../../../../person-system/people/email/email-rules/email-rule-agents/email-rule-agent.page-type.ts"

export const twitchOther = {
  id: "01a06863-fbe9-787c-a7b7-31046d56808e",
  pageTypeSlug: "email-rule-agent",
  slug: "twitch-other",
  title: "Twitch other",
  matches: [
    { field: "from", comparison: "ends-with", values: ["twitch.tv"] },
    { field: "subject", comparison: "does-not-contain", values: ["is live"] },
  ],
  judgement:
    "**Judge whatever no other rule claims, and send Alan what needs him.**\n\nNobody has decided what this mail is yet, so it is judged rather than acted on by pattern. A case that turns out to be understood becomes a rule of its own and stops arriving here.",
} as const satisfies EmailRuleAgent
