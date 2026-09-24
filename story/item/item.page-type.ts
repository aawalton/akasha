import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const item = {
  id: "01a0ca42-3962-7211-864c-1c57568c322b",
  type: "page-type/page-type",
  slug: "item",
  definition: "something a character has",
  pluralSlug: "items",
  extends: ["page-type/page"],
  parts: [
    "relation-property/item-character",
    "relation-property/item-essence",
    "relation-property/item-slot",
    "relation-property/item-story",
    "page-type/item-slot",
    "module/character-items-beside",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/item-story", required: true, many: false },
    { pageProperty: "relation-property/item-character", required: true, many: false },
    { pageProperty: "relation-property/item-slot", required: false, many: false },
    { pageProperty: "relation-property/item-essence", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What covers a creature and what a creature strikes with are items the creature has.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "What It Is",
      act: "Write in an item's description only what the item plainly is, as the player knows it.",
      warrant:
        "A description is read at a glance, so anything else in it is read as part of the thing.",
      aids: [
        "How the item is used belongs to the mechanic that uses it.",
        "What the item has been through belongs to git.",
        "What it is made from or was taken from is not what it is.",
        "An item it supersedes or pairs with is that other item's business.",
      ],
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
