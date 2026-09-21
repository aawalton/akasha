import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkAddonDependencyCycle = {
  id: "01a06297-7f6a-7484-a95a-2bbf183e482d",
  type: "page-type/module",
  slug: "check-addon-dependency-cycle",
  definition: "the run judging whether the game add-on load graph is acyclic",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The population the run states is the add-ons on the roster.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An add-on examined is an add-on whose manifest was read.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An empty roster ends the run rather than passing that run.",
    },
  ],
} as const satisfies Module
