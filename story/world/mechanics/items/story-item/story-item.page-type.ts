import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const storyItem = {
  id: "01a0ca42-3962-7211-864c-1c57568c322b",
  type: "page-type/page-type",
  slug: "story-item",
  definition: "a thing in one story, had by a character or lying in a place",
  pluralSlug: "items",
  extends: ["page-type/world-item"],
  parts: [
    "relation-property/item-character",
    "relation-property/item-essence",
    "relation-property/item-place",
    "relation-property/item-slot",
    "relation-property/item-story",
    "page-type/item-slot",
    "module/character-items-beside",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/item-story", required: true, many: false },
    { pageProperty: "relation-property/item-character", required: false, many: false },
    { pageProperty: "relation-property/item-place", required: false, many: false },
    { pageProperty: "relation-property/item-slot", required: false, many: false },
    { pageProperty: "relation-property/item-essence", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item is had by a character or lies in a place, and never both.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
