import type { Module } from "@akasha/code-system/module"

export const housingBuildWindow = {
  id: "01a06128-d5c7-7498-8a77-50a630fb18d4",
  pageTypeSlug: "module",
  slug: "housing-build-window",
  definition: "building the housing window itself, with its header and its body",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the window sits is kept in saved variables.",
    },
  ],
} as const satisfies Module
