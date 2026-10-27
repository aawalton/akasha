import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedBeside = {
  id: "01a0a160-1d33-7b41-8c07-5f9a2e6b3d18",
  type: "page-type/module",
  slug: "played-beside",
  definition: "the external id, coordinator agent and narrator a story played states",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The story played read is the one whose slug is the slug asked for.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A store that answers nothing is told apart from a slug no story played has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that is refused or throws is reported as well as drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The seat a story played names as its coordinator agent is read with its external id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A roleplayed story's narrator is its coordinator agent, named by her display name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story that is not roleplayed has no narrator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These are read again whenever the story's page changes while the story is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the store follows no change to that page, these are asked for on a timer.",
    },
  ],
  createdAt: "2026-09-14T19:23:45.843Z",
  updatedAt: "2026-10-27T23:40:39.611Z",
} as const satisfies Module
