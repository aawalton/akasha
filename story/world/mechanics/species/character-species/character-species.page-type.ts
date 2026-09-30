import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterSpecies = {
  id: "01a0f20b-f5fe-7225-9dc6-e532a26f95d1",
  type: "page-type/page-type",
  slug: "character-species",
  definition: "the species one character is, as a holding of the world's species",
  pluralSlug: "species-held",
  extends: ["page-type/world-species"],
  parts: ["relation-property/species-character", "relation-property/held-species"],
  properties: [
    { pageProperty: "relation-property/species-character", required: true, many: false },
    { pageProperty: "relation-property/held-species", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's species held are pages of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding's slug is its character's slug, then the species it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's species changes is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
