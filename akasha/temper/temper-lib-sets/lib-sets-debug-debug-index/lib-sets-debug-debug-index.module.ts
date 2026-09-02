import type { Module } from "@akasha/code-system/module"

export const libSetsDebugDebugIndex = {
  id: "01a0623c-2df8-74ef-9c3b-b2e335ab7b97",
  pageTypeSlug: "module",
  slug: "lib-sets-debug-debug-index",
  definition: "the order the debug modules are loaded in",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
    { invariantKind: "departure", statement: "This file holds imports and nothing else." },
  ],
} as const satisfies Module
