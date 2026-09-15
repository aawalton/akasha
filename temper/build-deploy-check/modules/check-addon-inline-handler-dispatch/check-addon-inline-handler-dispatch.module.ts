import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkAddonInlineHandlerDispatch = {
  id: "01a062a8-e76a-7a87-8a19-f63843b41826",
  type: "module",
  slug: "check-addon-inline-handler-dispatch",
  definition: "the run judging whether every governed inline markup handler is a single dispatch",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The population the run states is the markup the roster's add-ons hold.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Markup a build wrote is counted and left unjudged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A run judging no markup still says how much markup the add-ons held.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The run names every namespace the run governs.",
    },
  ],
} as const satisfies Module
