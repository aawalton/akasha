import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const worldItemCategory = {
  id: "01a17eb7-e856-713c-916b-7668b2ac629e",
  type: "page-type/select-property",
  slug: "world-item-category",
  propertySlug: "category",
  definition: "the sort of thing an item is",
  values: ["armor", "consumable", "material", "tool", "weapon"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item that is plainly none of these sorts states no category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Money is a purse rather than an item of any category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What covers a creature, clothing included, is armor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a creature strikes with, its own claws included, is a weapon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing that carries other things is a tool.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T18:55:44.214Z",
  updatedAt: "2026-10-27T19:00:39.687Z",
} as const satisfies SelectProperty
