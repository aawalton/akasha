import type { Module } from "@akasha/code-system/module"

export const libSetsDebugDebugState = {
  id: "01a0623c-2df7-753c-824c-7675ce095ff4",
  pageTypeSlug: "module",
  slug: "lib-sets-debug-debug-state",
  definition: "the constants the debug code reads once and the mutable counters a scan fills",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The debug functions reach each other through a table of slots rather than imports.",
    },
    {
      invariantKind: "constraint",
      statement: "The world name and API version are read once when the module loads.",
    },
  ],
} as const satisfies Module
