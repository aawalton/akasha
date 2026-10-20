import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonSpeed = {
  id: "01a15aad-557c-76f4-b8a9-2c859f67322b",
  type: "page-type/module",
  slug: "hud-addon-speed",
  definition: "the field in the bar saying how fast the player moves over the ground",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Speed is the ground the player covered over the last second, height left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A world unit is a centimeter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change of zone or a step faster than any run starts the measuring over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player not moving has no speed shown.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The readings are kept in the saved variables until the scale is seen right.",
    },
  ],
  createdAt: "2026-10-20T18:57:51.483Z",
  updatedAt: "2026-10-20T18:57:51.483Z",
} as const satisfies Module
