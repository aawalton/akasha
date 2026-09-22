import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownClassInteraction = {
  id: "01a06275-c448-7ac8-9637-3e9f0799a922",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-class-interaction",
  definition: "the anchoring and the mouse enter and exit behaviour of the dropdown control",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A submenu that would overflow the screen edge is flipped to the other side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A forced opening side skips the overflow check entirely.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every mouse exit arms a timeout rather than hiding the menu at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Entering a row raises the exit timeout on any open context menu.",
    },
  ],
} as const satisfies Module
