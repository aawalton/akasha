import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperItemBrowser = {
  id: "01a06178-3724-7ee9-b831-46e112ae8a76",
  pageTypeSlug: "workspace-package",
  slug: "temper-item-browser",
  definition:
    "every item set in the game, what it takes to complete one, and where its pieces drop",
  manifest: "json",
  partSlugs: [
    "module/item-browser-constants",
    "module/item-browser-types",
    "module/item-browser-refresh-state",
    "module/item-browser-multi-account",
    "module/item-browser-items-1",
    "module/item-browser-items-2",
    "module/item-browser-items-3",
    "module/item-browser-items",
    "module/item-browser-zone-classification",
    "module/item-browser-special-names",
    "module/item-browser-data",
    "module/item-browser-state",
    "module/item-browser-tooltip-extension",
    "module/item-browser-global",
    "module/item-browser-ui-strings",
    "module/item-browser-saved-vars",
    "module/item-browser-tooltip-hooks",
    "module/item-browser-item-link",
    "module/item-browser-list",
    "module/item-browser-tab",
    "module/item-browser-settings",
    "module/item-browser-start",
    "type-declaration/item-browser-global-declarations",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here reaches a Date.",
    },
    {
      invariantKind: "departure",
      statement: "The text here is English alone.",
    },
    {
      invariantKind: "departure",
      statement: "The item table here is a frozen port of an upstream table.",
    },
    {
      invariantKind: "gap",
      statement: "No program in this repository rebuilds the item table.",
    },
  ],
} as const satisfies WorkspacePackage
