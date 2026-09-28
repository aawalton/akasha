import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCoverPanel = {
  id: "01a0de7e-118e-760a-aace-b82f91d94001",
  type: "page-type/module",
  slug: "character-cover-panel",
  definition: "the covers of the other characters the latest turn of play is with",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The characters drawn are the latest turn's characters other than the player's, in its order.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The player's character is not drawn here, but in the player-character panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is drawn by the cover that character states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is named above the cover by that character's title.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A character with no cover is left out rather than drawn empty.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "No turn's cover is drawn here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No panel is drawn where no character drawn has a cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turn and its characters are each read by name rather than as a whole page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is read for a step whose names the step before has not given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover is asked for at twice the width the panel draws it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking a cover opens it whole over the page.",
    },
  ],
} as const satisfies Module
