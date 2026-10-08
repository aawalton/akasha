import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsKbfKeyboardFiltersIndex = {
  id: "01a0623e-53a2-70b8-a852-0cb34ae8684f",
  type: "page-type/module",
  slug: "sets-kbf-keyboard-filters-index",
  definition: "the ordered side-effect imports of the keyboard filter modules",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.946Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
