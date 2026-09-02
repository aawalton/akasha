import type { Module } from "@akasha/code-system/module"

export const housingLoad = {
  id: "01a06129-7a21-7959-af2e-c0db6ac6ac25",
  pageTypeSlug: "module",
  slug: "housing-load",
  definition: "what the housing add-on does once the game has loaded the add-on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loading begins the port-to-friend part and nothing else.",
    },
  ],
} as const satisfies Module
