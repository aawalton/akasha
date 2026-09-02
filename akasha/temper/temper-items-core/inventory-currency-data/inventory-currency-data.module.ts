import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryCurrencyData = {
  id: "01a060d9-498b-782c-aa63-7f9ef5125ebe",
  pageTypeSlug: "module",
  slug: "inventory-currency-data",
  definition: "every kind of money an account holds an amount of",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This table was written out from the inventory currency pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "The order of this table is the order a balance summary lists currencies in.",
    },
    {
      invariantKind: "gap",
      statement: "A currency moved to another place reorders every balance summary shown.",
    },
  ],
} as const satisfies Module
