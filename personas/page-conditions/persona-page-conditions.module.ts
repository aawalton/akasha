import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const personaPageConditions = {
  id: "01a05b70-a58c-7413-a712-cc8d144ab26a",
  type: "module",
  slug: "persona-page-conditions",
  definition: "the page conditions matching a persona and a relationship level",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A level matches whether that level is stored as a number or as text.",
    },
  ],
} as const satisfies Module
