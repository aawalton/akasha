import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompanionArmorPiece = {
  id: "01a0e0bf-70b2-7005-93af-796b3f4d8baa",
  type: "page-type/page-type",
  slug: "temper-companion-armor-piece",
  definition: "a piece of companion armor, worn in one place and made at one weight",
  extends: ["page-type/temper-companion-thing"],
  parts: ["relation-property/piece-armor-slot", "relation-property/piece-armor-weight"],
  properties: [
    { pageProperty: "relation-property/piece-armor-slot", required: true, many: false },
    { pageProperty: "relation-property/piece-armor-weight", required: true, many: false },
    { pageProperty: "number-property/ttc-item-id", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece is titled by what the game calls it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
