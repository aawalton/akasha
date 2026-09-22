import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsKbfFilterPanel = {
  id: "01a0623e-53a1-7dd5-a1ad-b9e1e7101b97",
  type: "page-type/module",
  slug: "lib-sets-kbf-filter-panel",
  definition: "the keyboard window's filter row assembled from its eleven dropdown builders",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The search button is turned off before the dropdowns are built.",
    },
  ],
} as const satisfies Module
