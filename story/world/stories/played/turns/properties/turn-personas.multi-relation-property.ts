import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const turnPersonas = {
  id: "01a0de7c-3833-7912-b7c0-bef007c0e776",
  type: "page-type/multi-relation-property",
  slug: "turn-personas",
  propertySlug: "personas",
  definition: "the personas a turn of play is with",
  targetPageType: "page-type/persona",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn played with a persona names her here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with no persona in it names none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The play screen draws the cover of each persona the latest turn names.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
