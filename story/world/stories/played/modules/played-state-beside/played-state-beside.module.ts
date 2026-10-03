import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedStateBeside = {
  id: "01a0de4c-3554-7639-96b1-340c959aae40",
  type: "page-type/module",
  slug: "played-state-beside",
  definition: "the state a story played draws, read off its character player's own pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The state drawn is what these pages hold and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character whose pages hold nothing has no state.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each part of the state is read through the world page type every story's own type extends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pools are the character's resources, and the level and attributes are its other numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skills, traits, quests, bonds, attunements and items drawn are the pages naming the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every part is narrowed to the character by the store rather than by this reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character's resources are on the sheet as well as in the pools.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The character's purses are read with the currencies they name, apart from its resources.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The species, class, rank, conditions and legacies drawn are the pages naming the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating it is unrevealed is drawn in no part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A held kind no story has filed a holding of is answered empty, and drawn as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read is asked again as the story's last turn changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A part the store refuses is reported and drawn as nothing, and the other parts are drawn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
} as const satisfies Module
