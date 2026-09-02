import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownClassInteraction = {
  id: "01a06275-c448-7ac8-9637-3e9f0799a922",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-class-interaction",
  definition: "the anchoring and the mouse enter and exit behaviour of the dropdown control",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A submenu that would overflow the screen edge is flipped to the other side.",
    },
    {
      invariantKind: "departure",
      statement: "A forced opening side skips the overflow check entirely.",
    },
    {
      invariantKind: "departure",
      statement: "Every mouse exit arms a timeout rather than hiding the menu at once.",
    },
    {
      invariantKind: "departure",
      statement: "Entering a row raises the exit timeout on any open context menu.",
    },
  ],
} as const satisfies Module
