import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ratingLadder = {
  id: "01a06281-4d9d-7001-9db5-f9ea87db3f71",
  type: "page-type/module",
  slug: "rating-ladder",
  definition: "the grades Alan gives, ordered from worst to best",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The ladder runs from `F` up to `S+` in sixteen rungs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grade further along the ladder is the better grade.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grade Alan has not given is below every rung.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grade of `B-` or better is liked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nine of the sixteen grades are liked.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No grade is named here that the rating property does not admit.",
    },
  ],
} as const satisfies Module
