import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerCharacterPanel = {
  id: "01a0e817-d6c0-7d98-bdd1-fc786451c663",
  type: "page-type/module",
  slug: "player-character-panel",
  definition: "the frame every game draws its player's character in: name, then cover, then sheet",
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
      statement: "No card is drawn where there is neither a cover nor a revealed sheet.",
    },
  ],
} as const satisfies Module
