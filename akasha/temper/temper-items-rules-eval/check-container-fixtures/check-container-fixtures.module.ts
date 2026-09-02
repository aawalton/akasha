import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkContainerFixtures = {
  id: "01a06137-f963-75d4-b14c-bdaa8c6693a8",
  pageTypeSlug: "module",
  slug: "check-container-fixtures",
  definition:
    "the stub environment, item facts, and compiled rules the container condition tests are built from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every stub environment lookup answers unknown until a test overrides the lookup.",
    },
    {
      invariantKind: "departure",
      statement: "A test context is built by spreading overrides over the stub environment.",
    },
    {
      invariantKind: "absence",
      statement: "The stub context carries no claim map and no stock groups.",
    },
  ],
} as const satisfies Module
