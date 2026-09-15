import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaPointsKeeping = {
  id: "01a082e4-93b8-7fa1-acc9-1b958af98ee5",
  type: "module",
  slug: "persona-points-keeping",
  definition: "the points a persona has earned, kept beside her own page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona's points are kept in the file beside her page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The points never reach the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys the points are carried under are named here alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hundred messages Alan wrote is one point.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count short of a hundred earns the fraction of a point the count reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The total kept is the points before today and today's points together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Keeping today's points replaces the total rather than adding to the total.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Both halves kept at once read back neither half from before.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The points before today are kept by the rebuild alone.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides which days fall before today.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here counts the messages a day carried.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out the rung a total reaches.",
    },
  ],
} as const satisfies Module
