import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingEntryDate = {
  id: "01a06827-ec0c-7939-809f-82468d73e2e6",
  type: "page-type/page-type",
  slug: "tracking-entry-date",
  definition: "a tracking entry for something that holds for a whole day",
  extends: ["page-type/tracking-entry"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A date entry counts to the day the entry was written in.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:44:01.932Z",
  updatedAt: "2026-10-30T16:50:16.487Z",
} as const satisfies PageType
