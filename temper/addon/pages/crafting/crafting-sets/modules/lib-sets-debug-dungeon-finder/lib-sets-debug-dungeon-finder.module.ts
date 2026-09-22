import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDebugDungeonFinder = {
  id: "01a0c513-4d66-7497-ad50-78e549ccb189",
  type: "page-type/module",
  slug: "lib-sets-debug-dungeon-finder",
  definition: "the dungeon rows the keyboard dungeon finder holds, read into the saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The dungeon finder window is opened when its rows have not been built yet.",
    },
  ],
} as const satisfies Module
