import type { Module } from "@akasha/code-system/module"

export const leadsUnitList = {
  id: "01a06274-b08a-7e24-bb52-b2b7aeb6d21d",
  pageTypeSlug: "module",
  slug: "leads-unit-list",
  definition: "the sortable, filtered list of leads",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The row this list draws is a virtual control the markup declares.",
    },
  ],
} as const satisfies Module
