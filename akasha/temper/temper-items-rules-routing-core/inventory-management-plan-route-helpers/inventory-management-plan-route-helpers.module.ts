import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanRouteHelpers = {
  id: "01a06151-3709-783e-95d5-d8689987fee1",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-route-helpers",
  definition:
    "the readings a route needs of an item's value, of storage keys and of character names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character absent from the captured holdings is named by its id.",
    },
    {
      invariantKind: "departure",
      statement: "An item carrying no captured value contributes nothing to a total.",
    },
  ],
} as const satisfies Module
