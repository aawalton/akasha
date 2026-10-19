import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const shoppingItem = {
  id: "01a15447-1cff-78e7-b4e3-ece9981a26c5",
  type: "page-type/page-type",
  slug: "shopping-item",
  definition: "a thing Alan means to buy",
  extends: ["page-type/page"],
  parts: ["instant-property/shopping-item-bought-at", "relation-property/shopping-item-store"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/shopping-item-store", required: false, many: false },
    { pageProperty: "instant-property/shopping-item-bought-at", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shopping item states no store where Alan has not said where he buys it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shopping item that is bought is kept as the same page rather than removed.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-19T13:08:29.054Z",
  updatedAt: "2026-10-19T13:08:29.054Z",
} as const satisfies PageType
