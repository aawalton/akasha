import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuPanelOptions = {
  id: "01a06100-0000-7000-8000-000000000006",
  type: "page-type/module",
  slug: "addon-menu-panel-options",
  definition:
    "the lifecycle of an addon's options panel from widget creation through open and close",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Widgets are created twenty at a time with ten milliseconds between batches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A widget that fails to create is reported to chat rather than aborting the panel.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two consecutive half-width widgets are reparented into a shared twin container.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Setting a handler on a panel prints a warning naming the callback to use instead.",
    },
  ],
} as const satisfies Module
