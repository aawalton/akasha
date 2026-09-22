import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const worldEntry = {
  id: "01a0c6cf-3083-7f5c-a624-ea21df497012",
  type: "page-type/module",
  slug: "world-entry",
  definition: "where the transpiler starts this add-on's one Lua file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each feature's entry is imported here, so the transpiler keeps every feature.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One registration hears the add-on load and starts each feature in turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Navigation starts before the features that pin the map through it.",
    },
  ],
} as const satisfies Module
