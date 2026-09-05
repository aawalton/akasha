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
      statement:
        "A caller asking for the kinds imports and calls this module rather than running that module.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is named in the map by the dispatched-as that kind states.",
    },
    {
      invariantKind: "departure",
      statement: "A kind's prompt sits in a file beside its page rather than in the page.",
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
  ],
} as const satisfies Module
