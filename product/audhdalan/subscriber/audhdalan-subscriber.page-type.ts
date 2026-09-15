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
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subscriber is slugged from the address the subscriber gave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The same address given again reaches the subscriber already filed here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subscriber arrives from the subscribe form audhdalan.com serves.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
