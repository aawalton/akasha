import type { Module } from "@akasha/code/module"

export const reducers = {
  id: "01a05b92-a9c7-78e7-86ac-75649bdb58ed",
  pageTypeSlug: "module",
  type: "module",
  slug: "reducers",
  definition: "the effects a view-editing command produces",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two nav items may each have a view of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "Every key written for a new view is a key the view page type declares.",
    },
  ],
} as const satisfies Module
