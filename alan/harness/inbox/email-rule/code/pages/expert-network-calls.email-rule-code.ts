import type { EmailRuleCode } from "akasha/alan/harness/inbox/email-rule/code/email-rule-code.page-type.types.ts"

export const expertNetworkCalls = {
  id: "01a06860-54a2-7d3b-b617-9c6662d711e4",
  type: "page-type/email-rule-code",
  slug: "expert-network-calls",
  title: "Expert network calls",
  matches: [
    {
      field: "from",
      comparison: "ends-with",
      values: [
        "tegus.com",
        "alpha-sense.com",
        "thirdbridge.com",
        "prosapient.com",
        "glgroup.com",
        "guidepoint.com",
        "guidepointglobaladvisors.com",
        "atheneum.ai",
        "dialecticanet.com",
        "streamrg.com",
        "alphasights.com",
      ],
    },
  ],
  filing: "archive",
  createdAt: "2026-09-03T17:45:38.722Z",
  updatedAt: "2026-09-15T16:49:29.000Z",
} as const satisfies EmailRuleCode
