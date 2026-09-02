import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData099 = {
  id: "01a061a3-9828-737e-ba3e-a85b4085ec39",
  pageTypeSlug: "module",
  slug: "sets-data-099",
  definition: "part 099 of the gear set table, swamp-raider through symphony-of-blades",
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
