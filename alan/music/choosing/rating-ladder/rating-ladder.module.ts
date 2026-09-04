import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const ratingLadder = {
  id: "01a06281-4d9d-7001-9db5-f9ea87db3f71",
  pageTypeSlug: "module",
  slug: "rating-ladder",
  definition: "the grades Alan gives, ordered from worst to best",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ladder runs from `F` up to `S+` in sixteen rungs.",
    },
    {
      invariantKind: "departure",
      statement: "A grade further along the ladder is the better grade.",
    },
    {
      invariantKind: "departure",
      statement: "A grade Alan has not given is below every rung.",
    },
    {
      invariantKind: "departure",
      statement: "A grade of `B-` or better is liked.",
    },
    {
      invariantKind: "departure",
      statement: "Nine of the sixteen grades are liked.",
    },
    {
      invariantKind: "absence",
      statement: "No grade is named here that the rating property does not admit.",
    },
  ],
} as const satisfies Module
