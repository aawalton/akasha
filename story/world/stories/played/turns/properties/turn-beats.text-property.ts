import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const turnBeats = {
  id: "01a0deae-97fe-7657-b0f2-2555162caa0d",
  type: "page-type/text-property",
  slug: "turn-beats",
  propertySlug: "beats",
  definition: "one thing that happens in a played turn, in the order the turn tells it",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master writes a turn's beats before the prose is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer writes the prose from the beats.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
