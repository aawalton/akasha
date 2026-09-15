import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeSubagent = {
  id: "01a0693a-bad9-717d-acdb-f16a6ac2554c",
  type: "module",
  slug: "compose-subagent",
  definition: "every subagent kind rendered as the JSON object the client's agents flag takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller asking for the kinds imports and calls this module rather than running that module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind is named in the map by the dispatched-as that kind states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind's prompt sits in a file beside its page rather than in the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind's definition in the map is the definition its page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A kind is named in the map with a model only where its page states one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two kinds dispatched by one name is refused rather than settled by order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An index naming no kind is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty map turns delegation off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages are read by a relative path within akasha rather than by a specifier.",
    },
  ],
} as const satisfies Module
