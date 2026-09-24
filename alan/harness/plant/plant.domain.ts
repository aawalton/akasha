import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const plant = {
  id: "01a06221-d65f-739e-9acb-74d67bbe92da",
  type: "page-type/domain",
  slug: "plant",
  definition: "the whole plants Alan eats",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "plant" },
    { partOfSpeech: "part-of-speech/noun", spelling: "plants" },
  ],

  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The grams are read from the food entries the workstation's checkout has.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "The window counted over runs from the hour Alan rose to the hour Alan rises next.",
    },
  ],
} as const satisfies Domain
