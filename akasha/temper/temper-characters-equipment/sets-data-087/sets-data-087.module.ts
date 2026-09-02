import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData087 = {
  id: "01a061a3-6218-78d8-aa07-3cb9423d61c8",
  pageTypeSlug: "module",
  slug: "sets-data-087",
  definition: "part 087 of the gear set table, senches-bite through seventh-legion-brute",
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
