import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiWayshrines = {
  id: "01a0d8e1-1b2d-7349-ab33-12f0d20c1ce0",
  type: "page-type/module",
  slug: "sets-core-api-wayshrines",
  definition: "the wayshrines a set is reached by, and the zone each wayshrine is in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The zone a wayshrine is in is read off the game client at first asking.",
    },
  ],
} as const satisfies Module
