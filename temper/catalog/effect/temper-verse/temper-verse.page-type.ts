import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperVerse = {
  id: "01a188b6-21c0-72b4-a8d9-c326568f78f5",
  type: "page-type/page-type",
  slug: "temper-verse",
  definition: "an ability the Infinite Archive offers a character for a run, as a verse",
  extends: ["page-type/temper-ability"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Infinite Archive offers a verse for a run, and no skill line teaches it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-29T17:35:00.000Z",
  updatedAt: "2026-10-29T17:35:00.000Z",
} as const satisfies PageType
