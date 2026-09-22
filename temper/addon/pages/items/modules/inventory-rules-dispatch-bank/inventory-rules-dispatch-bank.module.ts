import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBank = {
  id: "01a06258-b531-7715-8d2a-26fd26ca0747",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank",
  definition: "what happens when the bank opens, and the move used by every bank step",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a visit withdraws and deposits is bounded by backpack room and storage room, never by a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every backpack slot is judged afresh when the bank opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A visit stacks the backpack and the storage it opened once every move that visit plans has settled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A visit whose bank closed early stacks the bags it opened all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stacking waits for the moves to arrive rather than only for them to leave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether stacking is still under way is answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stacking counts as under way until the bags have been stacked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stacking record reaching a later visit than the one it is of is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The setting that stacks the backpack at login is the setting that stacks here.",
    },
  ],
} as const satisfies Module
