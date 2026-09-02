import type { Module } from "@akasha/code-system/module"

export const luaProtocol = {
  id: "01a06059-2491-7831-9607-9a067a9a884b",
  pageTypeSlug: "module",
  slug: "lua-protocol",
  definition: "the sentinels and the answer shape the driver and its caller agree on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sentinels are written once here and read by both sides.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is parsed rather than trusted.",
    },
    {
      invariantKind: "departure",
      statement: "A tagged object naming a number JSON cannot carry becomes that number.",
    },
    {
      invariantKind: "departure",
      statement: "A tagged object naming a function is left tagged and frozen.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a process.",
    },
  ],
} as const satisfies Module
