import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetHeader = {
  id: "01a06100-0000-7000-8000-000000000022",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-header",
  definition: "the section title with a rule above it",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The header holds a fixed height of thirty pixels.",
    },
    {
      invariantKind: "absence",
      statement: "No value is read or written by the header.",
    },
    {
      invariantKind: "departure",
      statement: "A help URL anchors its icon at the right edge of the title.",
    },
  ],
} as const satisfies Module
