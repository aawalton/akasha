import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const composeSubagent = {
  id: "01a0693a-bad9-717d-acdb-f16a6ac2554c",
  type: "page-type/module",
  slug: "compose-subagent",
  definition: "every subagent kind rendered as the JSON object the client's agents flag takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kind stating no prompt is left out of the map, so the client runs it as shipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A caller asking for the kinds imports and calls this module rather than running that module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is named in the map by the dispatched-as that kind states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind's prompt sits in a file beside its page rather than in the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind's definition in the map is the definition its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is named in the map with a model only where its page states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two kinds dispatched by one name is refused rather than settled by order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index naming no kind is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty map turns delegation off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are read by a relative path within akasha rather than by a specifier.",
    },
  ],
} as const satisfies Module
