import type { Module } from "@akasha/code-system/module"

export const housingState = {
  id: "01a06113-b7d2-735f-8277-3ecbda9af951",
  pageTypeSlug: "module",
  slug: "housing-state",
  definition: "the one holder carrying the add-on's settings, running state and saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every other module reaches this holder rather than importing a sibling module.",
    },
    {
      invariantKind: "departure",
      statement:
        "Reading saved variables before the add-on opens the saved variables raises an error.",
    },
  ],
} as const satisfies Module
