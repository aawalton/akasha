import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const classMappings = {
  id: "01a06340-4913-74f3-a491-8b1a1a81de29",
  type: "module",
  slug: "class-mappings",
  definition: "the character class index and id tables the capture addon reads",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A class id these tables do not carry falls back to the place `no-class` has.",
    },
    {
      invariantKind: "departure",
      statement: "No real class is written at the place an unknown class falls back to.",
    },
  ],
} as const satisfies Module
