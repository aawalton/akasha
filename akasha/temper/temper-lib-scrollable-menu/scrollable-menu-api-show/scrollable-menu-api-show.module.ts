import type { Module } from "@akasha/code-system/module"

export const scrollableMenuApiShow = {
  id: "01a06275-c443-70ac-b0c3-8545be8ec149",
  pageTypeSlug: "module",
  slug: "scrollable-menu-api-show",
  definition: "the globals covering the context menu from options through show to clear",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Clearing the menu hides the menu and restores the default option table.",
    },
    {
      invariantKind: "constraint",
      statement: "A special callback must carry a unique addon name or the call errors.",
    },
    {
      invariantKind: "departure",
      statement:
        "Options given to show are passed through a library callback before being applied.",
    },
    {
      invariantKind: "departure",
      statement:
        "Entry-type filtering of the callback item list runs against the allowed-type table.",
    },
  ],
} as const satisfies Module
