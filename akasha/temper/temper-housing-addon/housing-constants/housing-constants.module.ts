import type { Module } from "@akasha/code-system/module"

export const housingConstants = {
  id: "01a06113-b7cd-70cb-83dd-840a25b71d13",
  pageTypeSlug: "module",
  slug: "housing-constants",
  definition: "the tab, sort, filter and port-mode numbers the housing window works by",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A number saved under a player's settings keeps the meaning that number had.",
    },
  ],
} as const satisfies Module
