import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetCheckbox = {
  id: "01a06100-0000-7000-8000-000000000014",
  type: "page-type/module",
  slug: "addon-menu-widget-checkbox",
  definition: "the boolean on/off widget of the settings panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The checked state is rendered as the uppercase word ON or OFF rather than a box.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking anywhere on the row toggles the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Label color tracks the value even while the control is enabled.",
    },
  ],
} as const satisfies Module
