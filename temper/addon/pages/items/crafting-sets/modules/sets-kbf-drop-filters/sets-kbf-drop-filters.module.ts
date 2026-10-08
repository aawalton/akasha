import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsKbfDropFilters = {
  id: "01a0623e-53a1-7e95-9628-40837ad8c6e6",
  type: "page-type/module",
  slug: "sets-kbf-drop-filters",
  definition: "the dropdowns naming where a set drops",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A zone id at zero or below names a special zone rather than a game zone.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.945Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
