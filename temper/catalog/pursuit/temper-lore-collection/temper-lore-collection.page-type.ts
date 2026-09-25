import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperLoreCollection = {
  id: "01a06343-f9f7-7005-838d-006a4cec0e4f",
  type: "page-type/page-type",
  slug: "temper-lore-collection",
  definition: "a grouping of the game's lore library books",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/eso-collection-index",
    "number-property/eso-lore-category-id",
    "page-type/temper-lore-book",
    "number-property/eso-lore-collection-id",
    "text-property/lore-collection-description",
    "text-property/lore-collection-gamepad-icon",
    "boolean-property/lore-collection-hidden",
    "number-property/lore-collection-book-total",
  ],
  properties: [
    { pageProperty: "number-property/eso-lore-category-id", required: true, many: false },
    { pageProperty: "number-property/eso-collection-index", required: false, many: false },
    { pageProperty: "number-property/eso-lore-collection-id", required: false, many: false },
    { pageProperty: "text-property/lore-collection-description", required: false, many: false },
    { pageProperty: "text-property/lore-collection-gamepad-icon", required: false, many: false },
    { pageProperty: "boolean-property/lore-collection-hidden", required: false, many: false },
    { pageProperty: "number-property/lore-collection-book-total", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A collection is numbered inside its lore category rather than across all the lore categories.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Shalidor's Library is lore category 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection states its lore library entry only where the lore library has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection the lore library lacks has no number in its lore category.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
