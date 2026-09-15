import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libraryLogger = {
  id: "01a090e5-9062-788e-8317-a0e2f1dee9b7",
  type: "module",
  slug: "library-logger",
  definition: "the log a library writes to under the identifier that library goes by",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A library naming no loaded log library raises the identifier it asked under.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "LibDebugLogger is loaded before the library asking for a log.",
    },
  ],
} as const satisfies Module
