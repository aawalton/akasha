import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvSpeciesHeld = {
  id: "01a0f1ba-b381-7d33-a302-a3a947a83ded",
  type: "page-type/page-type",
  slug: "overwhere-iv-species-held",
  definition: "the species a character in Overwhere IV is",
  pluralSlug: "species-held",
  extends: ["page-type/world-species"],
  parts: [
    "relation-property/overwhere-iv-species-held-character",
    "relation-property/overwhere-iv-species-held-species",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-iv-species-held-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/overwhere-iv-species-held-species",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the character and the world's species that character is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An evolution or a change of race writes the new species here before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
