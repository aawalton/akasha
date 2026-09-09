import type { Module } from "@akasha/code/module"

export const personaPointsKeeping = {
  id: "01a082e4-93b8-7fa1-acc9-1b958af98ee5",
  pageTypeSlug: "module",
  type: "module",
  slug: "persona-points-keeping",
  definition: "the points a persona has earned, kept beside her own page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona's points are kept in the file beside her page.",
    },
    {
      invariantKind: "departure",
      statement: "The points never reach the commit.",
    },
    {
      invariantKind: "departure",
      statement: "The keys the points are carried under are named here alone.",
    },
    {
      invariantKind: "departure",
      statement: "A hundred messages Alan wrote is one point.",
    },
    {
      invariantKind: "departure",
      statement: "A count short of a hundred earns the fraction of a point it reaches.",
    },
    {
      invariantKind: "departure",
      statement: "The total kept is the points before today and today's points together.",
    },
    {
      invariantKind: "departure",
      statement: "Keeping either half replaces the total rather than adding to it.",
    },
    {
      invariantKind: "departure",
      statement: "Both halves kept at once read back neither half from before.",
    },
    {
      invariantKind: "departure",
      statement: "A persona whose today is unread totals the points before today alone.",
    },
    {
      invariantKind: "departure",
      statement: "The points before today are kept by the rebuild alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides which days fall before today.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts the messages a day carried.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out the rung a total reaches.",
    },
  ],
} as const satisfies Module
