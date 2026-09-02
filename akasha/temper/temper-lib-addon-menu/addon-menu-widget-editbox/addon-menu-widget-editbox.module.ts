import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetEditbox = {
  id: "01a06100-0000-7000-8000-000000000021",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-editbox",
  definition: "the text entry widget, single line or multiline",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The value is written back when the box loses focus.",
    },
    {
      invariantKind: "departure",
      statement: "An escape press writes the value back rather than discarding the edit.",
    },
    {
      invariantKind: "departure",
      statement: "A mouse wheel over a multiline box moves the cursor by whole lines.",
    },
    {
      invariantKind: "constraint",
      statement: "Input is capped at three thousand characters when maxChars is absent.",
    },
  ],
} as const satisfies Module
