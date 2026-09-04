import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"

export type TrackingCapture = Domain

export const trackingCapture = {
  id: "01a06827-ec0b-7fa8-bb0a-ae697d6c6a9e",
  pageTypeSlug: "page-type",
  slug: "tracking-capture",
  definition: "how something Alan did comes to be an entry",
  pluralSlug: "tracking-captures",
  extendsSlug: ["page-type/domain"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where a value came from is a page rather than a word on the field that holds it.",
    },
    {
      invariantKind: "absence",
      statement: "A capture carries nothing but the name it is reached by and what it means.",
    },
    {
      invariantKind: "gap",
      statement:
        "Alan saying so, a device measuring, a trace another system left, someone else's word and a weighing are the five captures, and each stands as a page of this type.",
    },
  ],
} as const satisfies PageType
