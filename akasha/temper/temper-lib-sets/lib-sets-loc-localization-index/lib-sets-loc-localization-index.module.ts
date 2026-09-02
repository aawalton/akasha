import type { Module } from "@akasha/code-system/module"

export const libSetsLocLocalizationIndex = {
  id: "01a061d7-7bba-7684-b634-224b2592273f",
  pageTypeSlug: "module",
  slug: "lib-sets-loc-localization-index",
  definition: "one import that runs the first languages' localization install",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This file holds a single import and declares nothing.",
    },
  ],
} as const satisfies Module
