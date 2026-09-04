import type { Module } from "@akasha/code-system/module"

export const population = {
  id: "01a06829-124f-785d-8df7-d560a1385c10",
  pageTypeSlug: "module",
  slug: "population",
  definition:
    "the members a check run examined, set against the members the run should have reached",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run that examined no member certifies nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A member that could not be examined is kept with the reason rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A member that could not be examined holds back the whole run's verdict.",
    },
    {
      invariantKind: "departure",
      statement: "A member that threw is passed over rather than ending the run.",
    },
    {
      invariantKind: "departure",
      statement: "A population stating a least count certifies nothing until that count arrives.",
    },
    {
      invariantKind: "departure",
      statement:
        "The count a run declares is the greater of the members that arrived and the least count.",
    },
    {
      invariantKind: "departure",
      statement: "A population that enumerates its members states no least count.",
    },
    {
      invariantKind: "departure",
      statement: "The root is the deepest folder every examined member's site shares.",
    },
    {
      invariantKind: "departure",
      statement: "A population no member of which has a site on this filesystem has no root.",
    },
    {
      invariantKind: "departure",
      statement: "A member carrying no site leaves the root as the other members left it.",
    },
    {
      invariantKind: "departure",
      statement: "Violations are gathered from every member even where the run certifies nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A population is made here rather than by a caller declaring one.",
    },
  ],
} as const satisfies Module
