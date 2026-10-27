import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldItem = {
  id: "01a06558-a991-78cc-a7cf-5b7b4ad460d7",
  type: "page-type/page-type",
  slug: "world-item",
  definition: "a thing in a world",
  pluralSlug: "items",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  parts: ["page-type/story-item", "select-property/world-item-category"],
  properties: [
    { pageProperty: "select-property/world-item-category", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What covers a creature and what a creature strikes with are items the creature has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing nobody can carry is an item too.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-10-27T18:58:49.902Z",
} as const satisfies PageType
