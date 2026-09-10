import type { PageType } from "@akasha/pages/page-type"

export const audhdalanSubscriber = {
  id: "019e2701-19cb-71d9-a820-bddf28cec176",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "audhdalan-subscriber",
  definition: "someone who asked to hear when Alan publishes",
  pluralSlug: "audhdalan-subscribers",
  extends: ["page-type/page"],
  parts: ["email-address-property/subscriber-email"],
  properties: [
    { pageProperty: "email-address-property/subscriber-email", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subscriber is slugged from the address the subscriber gave.",
    },
    {
      invariantKind: "departure",
      statement: "The same address given again reaches the subscriber already filed here.",
    },
    {
      invariantKind: "departure",
      statement: "A subscriber arrives from the subscribe form audhdalan.com serves.",
    },
  ],
  types: "ts",
} as const satisfies PageType
