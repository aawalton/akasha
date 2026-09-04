import type { Module } from "@akasha/code-system/module"

export const territoryMap = {
  id: "01a06890-2000-7000-9000-00000000000a",
  pageTypeSlug: "module",
  slug: "territory-map",
  definition: "which addon each lane holds while the temper port runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A map naming no addon is refused rather than read as a map naming none.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying a key the shape does not name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The map is read from the checkout this code stands in.",
    },
  ],
} as const satisfies Module
