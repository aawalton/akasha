import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBind = {
  id: "01a11be8-7c3f-7239-91c1-142ef2793388",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bind",
  definition: "binding items by rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bind is never undone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item already bound is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A locked item is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set piece already collected is never bound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One run binds one copy of a set piece and leaves the other copies as they are.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A bound item cannot be traded.",
    },
  ],
} as const satisfies Module
