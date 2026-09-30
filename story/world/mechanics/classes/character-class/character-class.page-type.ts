import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterClass = {
  id: "01a0f396-8661-74fc-abf1-0f1036a82e77",
  type: "page-type/page-type",
  slug: "character-class",
  definition: "the class one character holds, as a holding of the world's classes",
  pluralSlug: "classes-held",
  extends: ["page-type/world-class"],
  parts: ["relation-property/class-character", "relation-property/held-class"],
  properties: [
    { pageProperty: "relation-property/class-character", required: true, many: false },
    { pageProperty: "relation-property/held-class", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's classes held are pages of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding's slug is its character's slug, then the class it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's class rises is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
