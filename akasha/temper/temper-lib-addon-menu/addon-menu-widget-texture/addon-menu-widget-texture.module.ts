import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetTexture = {
  id: "01a06100-0000-7000-8000-000000000028",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-texture",
  definition: "the fixed-size image widget of the settings panel",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Image width and height are required and are not derived from the file.",
    },
    {
      invariantKind: "absence",
      statement: "No value is read or written by the texture widget.",
    },
    {
      invariantKind: "departure",
      statement: "The image is centered in a control that grows to fit the image.",
    },
  ],
} as const satisfies Module
