import type { EmailRuleCode } from "../../codes/email-rule-code.page-type.types.ts"

export const expertNetworkCalls = {
  id: "01a06860-54a2-7d3b-b617-9c6662d711e4",
  pageTypeSlug: "email-rule-code",
  type: "email-rule-code",
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
} as const satisfies EmailRuleCode
