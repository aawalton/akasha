import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData082 = {
  id: "01a061a3-6217-723c-b78e-2769d172c606",
  pageTypeSlug: "module",
  slug: "sets-data-082",
  definition: "part 082 of the gear set table, renalds-resolve through roaring-opportunist",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
