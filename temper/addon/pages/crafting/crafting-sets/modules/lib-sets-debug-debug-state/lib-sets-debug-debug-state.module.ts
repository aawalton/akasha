import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsDebugDebugState = {
  id: "01a0623c-2df7-753c-824c-7675ce095ff4",
  type: "page-type/module",
  slug: "lib-sets-debug-debug-state",
  definition: "the constants the debug code reads once and the mutable counters a scan fills",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The debug functions reach each other through a table of slots rather than imports.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The world name and API version are read once when the module loads.",
    },
  ],
} as const satisfies Module
