import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCoverPanel = {
  id: "01a0de7e-118e-760a-aace-b82f91d94001",
  type: "page-type/module",
  slug: "character-cover-panel",
  definition: "the covers of the latest turn of play and of the characters it is with",
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
      statement: "A turn's cover is drawn under the cover of the player's character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's cover is drawn first where no player's character is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn cover drawn opens on the latest turn that has a cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Arrows under the turn cover page through every turn at player that has a cover, drawn or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turn covers paged through are the ones the panel is handed rather than read here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn paged to is kept until a later turn is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No panel is drawn where no turn drawn and no character drawn has a cover.",
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
