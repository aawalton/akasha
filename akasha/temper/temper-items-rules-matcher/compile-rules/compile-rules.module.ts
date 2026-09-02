import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const compileRules = {
  id: "01a06151-370b-7db1-8ce0-836dab4a6093",
  pageTypeSlug: "module",
  slug: "compile-rules",
  definition: "a whole list of saved rules compiled at once for a property test",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each rule compiles on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The order the rules were given is kept.",
    },
  ],
} as const satisfies Module
