import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerCharacterPanel = {
  id: "01a0e817-d6c0-7d98-bdd1-fc786451c663",
  type: "page-type/module",
  slug: "player-character-panel",
  definition: "the card every game draws its characters in, the player's first with its sheet",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The player's character is one card, its name at the top as the caption.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character's cover comes under the caption, and the sheet's tabs under that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each game's player panel is this frame, handed that game's sheet or none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game draws the cover only where its panel asks for the cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caption is the character's title, else the sheet's name, else its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caption carries the character's level where the sheet states one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No sheet part is drawn while the sheet is unrevealed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No card is drawn where no character has a cover and no sheet is revealed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking the cover opens it whole over the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The latest turn's other characters follow the player's, in the turn's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The card opens on the player's character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The arrows under the cover step from one character to the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each character shown has the sheet's tabs drawn for its own pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another character's sheet is read as of the latest turn handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel drawing no sheet for the player draws none for the others either.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another character's caption carries that character's level where it is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel handed no turns draws the player's character alone.",
    },
  ],
} as const satisfies Module
