import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const greenDayFraction = {
  id: "01a05b70-a58c-7b22-84e5-578b0088bcf5",
  type: "module",
  slug: "green-day-fraction",
  definition: "the green-day points a persona states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A read of green-day points off a persona whose page states no figure is refused.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Green-day points at or below zero are refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No substitute is scored in place of the green-day points a persona omits.",
    },
  ],
} as const satisfies Module
