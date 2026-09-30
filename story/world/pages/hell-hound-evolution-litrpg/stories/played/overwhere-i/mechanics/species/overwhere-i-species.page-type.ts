import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereISpecies = {
  id: "01a0f1b7-9f9a-7784-841d-ef56aa5cb6e4",
  type: "page-type/page-type",
  slug: "overwhere-i-species",
  definition: "the species a character in Overwhere I is integrated as",
  pluralSlug: "species-held",
  extends: ["page-type/world-species"],
  parts: [
    "relation-property/overwhere-i-species-character",
    "relation-property/overwhere-i-species-species",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-i-species-character",
      required: true,
      many: false,
    },
    { pageProperty: "relation-property/overwhere-i-species-species", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the character and the world's species the System shows her as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A species changes only by evolution, and every change is written before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
