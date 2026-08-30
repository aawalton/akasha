import type { Module } from "../../code-system/module/module.page-type.ts"

export const waiting = {
  id: "01a04ef8-da76-7b5c-a410-29aa2cf260ff",
  pageTypeSlug: "module",
  slug: "waiting",
  definition: "a test holding on until something running elsewhere has become true",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is waited for is asked again rather than told.",
    },
    {
      invariantKind: "departure",
      statement: "Time running out is said as false rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "It is asked once more after time is up.",
    },
  ],
} as const satisfies Module
