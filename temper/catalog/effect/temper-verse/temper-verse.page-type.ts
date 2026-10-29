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
    {
      decisionKind: "decision-kind/departure",
      statement: "A verse's effect is an effects entry on the verse's own page, as a buff's is.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-29T17:35:00.000Z",
  updatedAt: "2026-10-29T18:37:01.094Z",
} as const satisfies PageType
