import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const audhdalanSubscriber = {
  id: "019e2701-19cb-71d9-a820-bddf28cec176",
  type: "page-type/page-type",
  slug: "audhdalan-subscriber",
  definition: "someone who asked to hear when Alan publishes",
  extends: ["page-type/page"],
  parts: ["email-address-property/subscriber-email"],
  properties: [
    { pageProperty: "email-address-property/subscriber-email", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A subscriber is slugged from the address the subscriber gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An address whose fold names no page, or another address's page, is slugged from its hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same address given again reaches the subscriber already filed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subscriber arrives from the subscribe form audhdalan.com serves.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
