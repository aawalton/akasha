import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonDependencyCycle = {
  id: "01a06297-7f6a-7306-9a6f-acca84ccb4b8",
  type: "page-type/module",
  slug: "addon-dependency-cycle",
  definition: "the cycles in what a game add-on declares it loads after",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A cycle the search reaches a second time is reported once.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A cycle is named from its alphabetically first member.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An edge to an add-on outside the roster is no edge.",
    },
  ],
  createdAt: "2026-09-02T14:48:10.858Z",
  updatedAt: "2026-09-21T22:03:34.000Z",
} as const satisfies Module
