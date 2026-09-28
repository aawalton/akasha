import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCoverPanel = {
  id: "01a0de7e-118e-760a-aace-b82f91d94001",
  type: "page-type/module",
  slug: "character-cover-panel",
  definition: "the covers of the characters the latest turn of play is with",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The characters drawn are the characters the latest turn drawn names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where no open turn names a character, as after a chapter closes, the story's player is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character the player plays is drawn as every other character is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is drawn by the cover that character states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character is named under the cover by that character's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character with no cover is left out rather than drawn empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The player's character is drawn first, and every other character after.",
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
  ],
} as const satisfies Module
