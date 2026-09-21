import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const slugSpelling = {
  id: "01a0c660-9eed-7002-a988-5c9dba196faf",
  type: "page-type/module",
  slug: "slug-spelling",
  definition: "which modules another file names by spelling that module's slug",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A runner names the module it runs by spelling that module's slug as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug is spelled where a whole quoted word is that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug spelled inside a longer word is no spelling of that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A module's own files spell that module's slug for its page rather than for a run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is searched once for every slug asked after rather than once for each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a body the search named is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run asking after no slug searches nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the index.",
    },
  ],
} as const satisfies Module
