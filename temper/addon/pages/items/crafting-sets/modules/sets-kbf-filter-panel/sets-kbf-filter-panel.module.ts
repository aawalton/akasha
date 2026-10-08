import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsKbfFilterPanel = {
  id: "01a0623e-53a1-7dd5-a1ad-b9e1e7101b97",
  type: "page-type/module",
  slug: "sets-kbf-filter-panel",
  definition: "the keyboard window's filter row assembled from its eleven dropdown builders",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The search button is turned off before the dropdowns are built.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.945Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
