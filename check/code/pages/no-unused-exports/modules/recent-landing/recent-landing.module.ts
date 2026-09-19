import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recentLanding = {
  id: "01a0a6a5-eb52-75e5-80e6-26f59f6bee6b",
  type: "page-type/module",
  slug: "recent-landing",
  definition:
    "which of the paths a refusal names landed inside the last day, and which never landed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The day is measured back from a `now` the caller states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path git names in a commit inside that day has landed lately.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the head commit holds nowhere has landed never.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal over a path that landed lately or landed never is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the paths the refusals name are handed to git.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Git is asked once for the whole set rather than once for each path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run holding no refusal asks git nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a body or reaches the index.",
    },
  ],
} as const satisfies Module
