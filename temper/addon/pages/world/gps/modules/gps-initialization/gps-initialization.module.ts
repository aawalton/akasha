import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gpsInitialization = {
  id: "01a0614d-4763-7c62-91c1-1e17aa3b70e1",
  type: "page-type/module",
  slug: "gps-initialization",
  definition: "what this feature builds as the bundle loads and once the add-on has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The map is put on the player's location once the add-on has loaded.",
    },
  ],
} as const satisfies Module
