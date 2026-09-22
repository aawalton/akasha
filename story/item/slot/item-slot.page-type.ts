import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const itemSlot = {
  id: "01a0ca45-bac0-7c6d-83bf-8415bedd0526",
  type: "page-type/page-type",
  slug: "item-slot",
  definition: "a place on a character an item is worn",
  pluralSlug: "slots",
  extends: ["page-type/page"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A character wearing nothing in a slot has no page for that slot.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
