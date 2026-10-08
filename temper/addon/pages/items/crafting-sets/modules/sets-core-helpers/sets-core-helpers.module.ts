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
  createdAt: "2026-09-02T11:59:13.129Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
