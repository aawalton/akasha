import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const lore = {
  id: "01a0d41b-785e-7bb8-b6fd-3c32ff5a377a",
  type: "page-type/page-type",
  slug: "lore",
  definition: "a truth about a world",
  pluralSlug: "lore",
  extends: ["page-type/page"],
  parts: ["relation-property/lore-disclosure", "text-property/lore-facts"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: true, many: false },
    { pageProperty: "relation-property/lore-disclosure", required: true, many: false },
    { pageProperty: "text-property/lore-facts", required: true, many: true, maxCount: null },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact sits on one lore page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact states the world rather than instructs the game master.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
