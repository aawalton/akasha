import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const argumentRouting = {
  id: "01a0950b-0fcf-748a-ab25-7046edcbcf59",
  type: "module",
  slug: "argument-routing",
  definition: "the argument naming the file another argument's value is read from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A route argument is the argument it routes with the route suffix on the end.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The route suffix is `-file`.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "The suffix every route argument's name ends in is spelled here alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens the file a route argument names.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows which arguments a command takes.",
    },
  ],
} as const satisfies Module
