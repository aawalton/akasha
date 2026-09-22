import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const argumentRouting = {
  id: "01a0950b-0fcf-748a-ab25-7046edcbcf59",
  type: "page-type/module",
  slug: "argument-routing",
  definition: "the argument naming the file holding another argument's value",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A route argument is the argument it routes with the route suffix on the end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The route suffix is `-file`.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "The suffix every route argument's name ends in is spelled here alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens the file a route argument names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which arguments a command takes.",
    },
  ],
} as const satisfies Module
