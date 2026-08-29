import type { Module } from "../code-system/module/module.page-type.ts"

export const waiting = {
  id: "01a04ef8-da76-7b5c-a410-29aa2cf260ff",
  pageTypeSlug: "module",
  slug: "waiting",
  definition: "a test holding on until something running elsewhere has become true",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What is waited for is asked again rather than told, so nothing has to be wired to say when it happened.",
    },
    {
      invariantKind: "departure",
      statement:
        "Time running out is said as false rather than thrown, so the test that asked names what it wanted rather than reading a timeout.",
    },
    {
      invariantKind: "departure",
      statement:
        "It is asked once more after time is up, so something that became true in the last gap is not read as never having.",
    },
  ],
} as const satisfies Module
