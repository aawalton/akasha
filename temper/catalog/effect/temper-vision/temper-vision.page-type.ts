import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperVision = {
  id: "01a188b6-21c0-7075-873e-5cd3b9923575",
  type: "page-type/page-type",
  slug: "temper-vision",
  definition: "an ability the Infinite Archive offers a character for a run, as a vision",
  extends: ["page-type/temper-ability"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Infinite Archive offers a vision for a run, and no skill line teaches it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A vision's effect is an effects entry on the vision's own page, as a buff's is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fractional-change-per-stack effect is multiplied by the stacks the reading keeps.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-29T17:35:00.000Z",
  updatedAt: "2026-10-29T18:37:01.094Z",
} as const satisfies PageType
