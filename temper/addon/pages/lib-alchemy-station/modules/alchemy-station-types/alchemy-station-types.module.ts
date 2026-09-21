import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const alchemyStationTypes = {
  id: "01a06054-98bd-71bf-8f8d-ba29e4db147c",
  type: "page-type/module",
  slug: "alchemy-station-types",
  definition: "the shape of a tab a caller adds and of the library the game global has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A descriptor is a number or a string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tab names four textures for the states of the button.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The control a tab draws into is filled in by the library.",
    },
  ],
} as const satisfies Module
