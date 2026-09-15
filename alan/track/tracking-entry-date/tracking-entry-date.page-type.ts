import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingEntryDate = {
  id: "01a06827-ec0c-7939-809f-82468d73e2e6",
  type: "page-type",
  slug: "tracking-entry-date",
  definition: "a tracking entry for something true of a whole day",
  extends: ["page-type/tracking-entry"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A date entry counts to the day the entry was written in.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
