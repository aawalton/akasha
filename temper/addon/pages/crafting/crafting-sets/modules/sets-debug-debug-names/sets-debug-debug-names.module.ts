import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDebugDebugNames = {
  id: "01a0623c-2df8-7289-bd0d-011e31da3e86",
  type: "page-type/module",
  slug: "sets-debug-debug-names",
  definition: "the names the running client reports for one language and the set ids new to it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing is read here when the client language is not an official one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The dungeon finder window is opened when its rows have not been built yet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every name is stored under the client language in which the name was read.",
    },
  ],
} as const satisfies Module
