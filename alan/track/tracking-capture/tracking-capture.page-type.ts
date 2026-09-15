import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingCapture = {
  id: "01a06827-ec0b-7fa8-bb0a-ae697d6c6a9e",
  type: "page-type/page-type",
  slug: "tracking-capture",
  definition: "how something Alan did comes to be an entry",
  extends: ["page-type/domain"],
  parts: [
    "tracking-capture/judgment",
    "tracking-capture/measurement",
    "tracking-capture/report",
    "tracking-capture/testimony",
    "tracking-capture/trace",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where a value came from is a page rather than a word on the field that has that value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "A capture has nothing but the name that capture is reached by and that capture's meaning.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "There are five captures.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Alan saying so is a capture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A device measuring is a capture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A trace another system left is a capture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Someone else's word is a capture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A weighing is a capture.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each capture is a page of this type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every tracked field states the single capture its values come of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture says how a value came to exist rather than how good the value is.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
