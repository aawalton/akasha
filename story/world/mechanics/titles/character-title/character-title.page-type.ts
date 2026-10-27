import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterTitle = {
  id: "01a17ebe-19c2-733f-bc86-c00084693644",
  type: "page-type/page-type",
  slug: "character-title",
  definition: "a title one character holds, as a holding of the world's titles",
  pluralSlug: "titles-held",
  extends: ["page-type/world-title"],
  parts: ["relation-property/title-character", "relation-property/held-title"],
  properties: [
    { pageProperty: "relation-property/title-character", required: true, many: false },
    { pageProperty: "relation-property/held-title", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's titles held are pages of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding's slug is its character's slug, then the title it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding is made in the beat that grants the title.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T19:02:30.081Z",
  updatedAt: "2026-10-27T19:02:30.081Z",
} as const satisfies PageType
