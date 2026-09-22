import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharacterRace = {
  id: "01a0608a-c133-7d7f-96d5-f0070cf3a77a",
  type: "page-type/domain",
  slug: "temper-character-race",
  definition: "the playable races of an Elder Scrolls Online character",
  parts: ["module/race-icon-url", "module/races"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The race data here is written out from the race pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A race is reached by its own id rather than by the race id the game has.",
    },
  ],
} as const satisfies Domain
