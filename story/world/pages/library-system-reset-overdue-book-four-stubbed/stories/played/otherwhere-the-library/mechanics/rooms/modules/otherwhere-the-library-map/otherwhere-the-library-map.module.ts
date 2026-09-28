import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const otherwhereTheLibraryMap = {
  id: "01a0e837-c54e-7f48-a2d2-3bab24d2082e",
  type: "page-type/module",
  slug: "otherwhere-the-library-map",
  definition: "the Library's rooms shown to a player, each lit or dark, laid out by floor",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The map asks the server only for the rooms shown to the story's player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room shown to no one never reaches the browser drawing the map.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each room is drawn in the cell the map layout gives it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A floor is named only where the rooms drawn sit on more than one floor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room with a stair to another room drawn shows which way that stair goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No panel is drawn where no room has been shown to the player.",
    },
  ],
} as const satisfies Module
