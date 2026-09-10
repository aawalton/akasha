import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const healthSamplesAccess = {
  id: "01a05bc7-9129-7000-a4ef-ca6a1a3463b1",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "health-samples-access",
  definition: "step and calorie readings kept on the ESO day each began in",
  parts: [
    "module/sample-shape",
    "module/sample-identity",
    "module/sample-rows",
    "module/sample-selecting",
    "module/latest-arrival",
    "module/sample-upsert",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the device a reading came from.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading is filed under the ESO day the reading started in rather than the day the reading arrived.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is read and written as a page akasha has.",
    },
  ],
} as const satisfies Domain
