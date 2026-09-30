import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiSpeciesHeld = {
  id: "01a0f1b8-7b28-7c35-9f9d-7212fa4c192b",
  type: "page-type/page-type",
  slug: "overwhere-iii-species-held",
  definition: "the species a character in Overwhere III is",
  pluralSlug: "species-held",
  extends: ["page-type/world-species"],
  parts: [
    "relation-property/overwhere-iii-species-held-character",
    "relation-property/overwhere-iii-species-held-species",
  ],
  properties: [
    {
      pageProperty: "relation-property/overwhere-iii-species-held-character",
      required: true,
      many: false,
    },
    {
      pageProperty: "relation-property/overwhere-iii-species-held-species",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the character and the species that character is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An evolution or a change of body writes the new species here before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
