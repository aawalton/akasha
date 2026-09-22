import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiSharedHelpers = {
  id: "01a0623c-2df8-7e9e-914b-b335605e5366",
  type: "page-type/module",
  slug: "sets-search-ui-shared-helpers",
  definition: "the odd jobs the shared search window keeps outside its class",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The set data is topped up from the library once and never again.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A term reaches the saved history 1500 milliseconds after the last keystroke.",
    },
  ],
} as const satisfies Module
