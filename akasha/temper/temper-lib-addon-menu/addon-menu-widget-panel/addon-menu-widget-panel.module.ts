import type { Module } from "@akasha/code-system/module"

export const addonMenuWidgetPanel = {
  id: "01a06100-0000-7000-8000-000000000025",
  pageTypeSlug: "module",
  slug: "addon-menu-widget-panel",
  definition: "the scrolling page of one addon's settings, headed by its name and author",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The website and feedback and translation and donation links are laid out in one row.",
    },
    {
      invariantKind: "departure",
      statement: "A donation link is colored gold where the other links are blue.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refresh callback is registered once however many panels ask for that callback.",
    },
    {
      invariantKind: "departure",
      statement: "Forcing defaults walks the registered controls and then fires a refresh.",
    },
  ],
} as const satisfies Module
