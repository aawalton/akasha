import type { Module } from "../../code-system/modules/module.page-type.ts"

export const greenDayFraction = {
  id: "01a05b70-a58c-7b22-84e5-578b0088bcf5",
  pageTypeSlug: "module",
  slug: "green-day-fraction",
  definition: "the green-day points a persona states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A read of green-day points off a persona whose page states no figure is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "Green-day points at or below zero are refused.",
    },
    {
      invariantKind: "absence",
      statement: "No substitute is scored in place of the green-day points a persona omits.",
    },
  ],
} as const satisfies Module
