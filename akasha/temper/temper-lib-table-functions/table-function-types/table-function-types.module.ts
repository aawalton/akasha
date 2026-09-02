import type { Module } from "@akasha/code-system/module"

export const tableFunctionTypes = {
  id: "01a06052-2ca5-7438-a4c4-749daaf6f554",
  pageTypeSlug: "module",
  slug: "table-function-types",
  definition: "the shape of the table helpers the game global carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every helper is called as a method.",
    },
    {
      invariantKind: "departure",
      statement: "The self a helper takes is the library.",
    },
    {
      invariantKind: "departure",
      statement: "The library states a version number.",
    },
  ],
} as const satisfies Module
