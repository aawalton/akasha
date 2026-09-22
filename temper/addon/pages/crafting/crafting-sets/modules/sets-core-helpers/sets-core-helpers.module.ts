import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreHelpers = {
  id: "01a061fc-cee9-7baa-81aa-c052ca2349fa",
  type: "page-type/module",
  slug: "sets-core-helpers",
  definition:
    "the small conversions shared across this library, from language choice to guarded chat input",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A table handed back to a caller is a shallow copy rather than the library's own table.",
    },
  ],
} as const satisfies Module
