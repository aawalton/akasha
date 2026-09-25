import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkAddonTextures = {
  id: "01a0d9a7-dedf-72ae-9e52-b08b27eb4e1a", type: "page-type/module",
  slug: "check-addon-textures",
  definition: "the run judging whether every texture an add-on names is there to draw",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture an add-on names under its own folder is missing unless that add-on ships it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's texture is there where the game's archive or its own interface names it.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A game texture nothing confirms is listed as unconfirmed rather than missing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a missing texture fails the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Code the add-ons share outside their own folders is read as theirs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's art is read on the workstation, and only a path it lacks is named.",
    },
  ],
} as const satisfies Module
