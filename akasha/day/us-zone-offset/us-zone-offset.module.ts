import type { Module } from "../../code-system/modules/module.page-type.ts"

export const usZoneOffset = {
  id: "01a05c77-31e6-7877-b124-3f103fd4ac3d",
  pageTypeSlug: "module",
  slug: "us-zone-offset",
  definition: "how far behind UTC New York and Denver stand at one instant",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Saving time runs from the second Sunday in March to the first Sunday in November.",
    },
    {
      invariantKind: "departure",
      statement: "New York and Denver turn on the same instant.",
    },
    {
      invariantKind: "constraint",
      statement: "The rule standing today is applied to every year.",
    },
  ],
} as const satisfies Module
