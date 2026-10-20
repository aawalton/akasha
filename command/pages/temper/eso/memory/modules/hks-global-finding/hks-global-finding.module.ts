import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hksGlobalFinding = {
  id: "01a15586-9c1d-7af9-88ac-e4ff7299d377",
  type: "page-type/module",
  slug: "hks-global-finding",
  definition: "a table the game's Lua holds under a global name, found in the game's memory",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every address in the game's memory changes when the game reloads its interface.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A global is found by its name's string, then by the entry whose key is that string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A global found is held by its entry and its name's string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every global asked for at once is looked for in the same passes over the memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The search for entries ends once every name with a string has its global.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A global held is read only while its entry's key is still that string and its value a table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search may be told globals a reload left behind, and never finds those again.",
    },
  ],
  createdAt: "2026-10-19T18:57:27.580Z",
  updatedAt: "2026-10-20T17:34:17.265Z",
} as const satisfies Module
