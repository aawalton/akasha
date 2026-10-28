import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAbility = {
  id: "01a18461-4b11-77c9-b48d-c624be4dbafa",
  type: "page-type/page-type",
  slug: "temper-ability",
  definition: "something the game works out a number for under an ability id of its own",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["text-property/ability-equations", "number-property/eso-ability-id"],
  properties: [
    {
      pageProperty: "text-property/ability-equations",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/eso-ability-id", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill, a status effect and an item's triggered effect are each an ability.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T21:18:51.152Z",
  updatedAt: "2026-10-28T21:33:14.554Z",
} as const satisfies PageType
