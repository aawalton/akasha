import type { Module } from "@akasha/code-system/module"

export const alchemyStation = {
  id: "01a06054-98bc-78f0-afbb-f7343cb932bb",
  pageTypeSlug: "module",
  slug: "alchemy-station",
  definition: "a tab added to the alchemy crafting station and the panel behind that tab",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The panel holding every tab is created once.",
    },
    {
      invariantKind: "departure",
      statement: "A tab's own control fills the panel holding every tab.",
    },
    {
      invariantKind: "departure",
      statement: "Switching mode hides every tab but the one switched to.",
    },
    {
      invariantKind: "departure",
      statement: "A tab's callback runs only where the mode changed.",
    },
    {
      invariantKind: "departure",
      statement: "The label above the panel is set from the name the tab carries.",
    },
  ],
} as const satisfies Module
