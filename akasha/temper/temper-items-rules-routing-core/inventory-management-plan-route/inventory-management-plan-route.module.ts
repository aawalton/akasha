import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanRoute = {
  id: "01a06151-3709-7e05-8784-492a19817f13",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-route",
  definition: "the route one item takes from where the item lies to where a rule sends it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route is worked out from where the item lies and from where the rule sends it.",
    },
    {
      invariantKind: "departure",
      statement: "An item already where the rule sends it needs no route.",
    },
  ],
} as const satisfies Module
