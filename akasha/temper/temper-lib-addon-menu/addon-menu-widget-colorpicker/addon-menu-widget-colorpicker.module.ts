import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetColorpicker = {
  id: "01a06100-0000-7000-8000-000000000015",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-colorpicker",
  definition: "the color swatch widget of the settings panel",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The swatch hands four separate channel numbers to setFunc rather than a table.",
    },
    {
      invariantKind: "departure",
      statement: "A default color is read from a table of r and g and b and a fields.",
    },
    {
      invariantKind: "constraint",
      statement: "Gamepad mode opens a different color picker than keyboard mode.",
    },
  ],
} as const satisfies Module
