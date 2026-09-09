import type { PageType } from "@akasha/pages/page-type"

export const trackingCapture = {
  id: "01a06827-ec0b-7fa8-bb0a-ae697d6c6a9e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "tracking-capture",
  definition: "how something Alan did comes to be an entry",
  pluralSlug: "tracking-captures",
  extends: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Where a value came from is a page rather than a word on the field that has that value.",
    },
    {
      invariantKind: "absence",
      statement:
        "A capture has nothing but the name that capture is reached by and that capture's meaning.",
    },
    {
      invariantKind: "departure",
      statement: "There are five captures.",
    },
    {
      invariantKind: "departure",
      statement: "Alan saying so is a capture.",
    },
    {
      invariantKind: "departure",
      statement: "A device measuring is a capture.",
    },
    {
      invariantKind: "departure",
      statement: "A trace another system left is a capture.",
    },
    {
      invariantKind: "departure",
      statement: "Someone else's word is a capture.",
    },
    {
      invariantKind: "departure",
      statement: "A weighing is a capture.",
    },
    {
      invariantKind: "gap",
      statement: "Each capture is a page of this type.",
    },
  ],
  types: "ts",
} as const satisfies PageType
