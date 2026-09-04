import type { Module } from "@akasha/code-system/module"

export const composeSubagents = {
  id: "01a0693a-bad9-717d-acdb-f16a6ac2554c",
  pageTypeSlug: "module",
  slug: "compose-subagents",
  definition: "every subagent kind rendered as the JSON object the client's agents flag takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This is run as its own program, killed at a ceiling by what asks it.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is named in the map by what it states it is dispatched as.",
    },
    {
      invariantKind: "departure",
      statement: "A kind's prompt stands in a file beside its page rather than in the page.",
    },
    {
      invariantKind: "departure",
      statement: "Two kinds dispatched by one name is refused rather than settled by order.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no kind is refused, because an empty map turns delegation off.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are read by a relative path within akasha rather than by a specifier.",
    },
    {
      invariantKind: "gap",
      statement: "The old copy at tools/compose-subagents.ts still stands and still has readers.",
    },
  ],
} as const satisfies Module
