import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersDialogs = {
  id: "01a0de85-2b4b-757f-b4fa-a554f454f7b7",
  type: "page-type/module",
  slug: "markers-dialogs",
  definition: "the confirmations, notices and name prompts the markers ask the player with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is asked for in the gamepad prompt while the player plays by gamepad.",
    },
  ],
} as const satisfies Module
