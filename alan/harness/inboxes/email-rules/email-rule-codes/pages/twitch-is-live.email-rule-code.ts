import type { EmailRuleCode } from "../../../../../../person-system/people/email/email-rules/email-rule-codes/email-rule-code.page-type.ts"

export const twitchIsLive = {
  id: "01a06860-54a2-74e4-b1de-c25726f6d96a",
  pageTypeSlug: "email-rule-code",
  slug: "twitch-is-live",
  title: "Twitch is live",
  matches: [
    { field: "from", comparison: "ends-with", values: ["twitch.tv"] },
    { field: "subject", comparison: "contains", values: ["is live"] },
  ],
  filing: "archive",
  actions: ["unsubscribe"],
} as const satisfies EmailRuleCode
