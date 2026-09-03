import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const emailOperations = {
  id: "01a0658e-2bf5-7001-a81d-b52dcc937d44",
  pageTypeSlug: "module",
  slug: "email-operations",
  definition: "the email operations of this package gathered behind one lazy load",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The operations are loaded when a caller asks rather than at import.",
    },
    {
      invariantKind: "departure",
      statement: "The seven modules gathered here answer as a single object.",
    },
    {
      invariantKind: "gap",
      statement:
        "A caller reaches the operation a caller wants by the way in naming that operation.",
    },
  ],
} as const satisfies Module
