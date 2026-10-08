import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetColorpicker = {
  id: "01a06100-0000-7000-8000-000000000015",
  type: "page-type/module",
  slug: "addon-menu-widget-colorpicker",
  definition: "the color swatch widget of the settings panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The swatch hands four separate channel numbers to setFunc rather than a table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A default color is read from a table of r and g and b and a fields.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Gamepad mode opens a different color picker than keyboard mode.",
    },
  ],
  createdAt: "2026-09-02T07:23:05.088Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
