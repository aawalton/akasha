import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const useCharacters = {
  id: "01a06360-7480-7001-8431-aa4304c430ae",
  pageTypeSlug: "module",
  slug: "use-characters",
  definition: "a player's character builds, read and written",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character build is owned by the user id its userId property holds.",
    },
    {
      invariantKind: "departure",
      statement: "Build metadata that does not parse reads as null.",
    },
    {
      invariantKind: "absence",
      statement: "A role the character sources do not name is dropped from base roles.",
    },
  ],
} as const satisfies Module
