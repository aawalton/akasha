import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionsEntry = {
  id: "01a0624c-a660-733f-be75-ba33c296eec3",
  type: "page-type/module",
  slug: "collections-entry",
  definition: "where the transpiler starts this add-on's Lua bundle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here runs before the game says this add-on has loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The global is published before any tracker is reached.",
    },
  ],
} as const satisfies Module
