import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryManagementPlanTestUtils = {
  id: "01a0615a-a1dc-7882-8483-be86859114a7",
  pageTypeSlug: "module",
  slug: "inventory-management-plan-test-utils",
  definition: "the items, holdings and rules a plan test builds when the test cares about neither",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the test leaves unnamed takes the value stated here.",
    },
  ],
} as const satisfies Module
