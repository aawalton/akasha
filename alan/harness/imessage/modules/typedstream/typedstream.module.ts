import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typedstream = {
  id: "01a05bc9-4308-7002-8ad9-2d99f9097e39",
  type: "page-type/module",
  slug: "typedstream",
  definition: "the text held inside an Apple typedstream message body",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body this module cannot read answers with nothing rather than failing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the first string the body has is read out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body states its length in one form of three forms.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No fixture here is a message anyone sent.",
    },
  ],
} as const satisfies Module
