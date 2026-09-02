import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanRouteSteps = {
  id: "01a06151-3709-7ab7-b5e0-b46be6326c2d",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-route-steps",
  definition: "the steps for handing an item between characters or through shared storage",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item passing between characters goes through storage each character reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A hand-off deposits before withdrawing.",
    },
  ],
} as const satisfies Module
