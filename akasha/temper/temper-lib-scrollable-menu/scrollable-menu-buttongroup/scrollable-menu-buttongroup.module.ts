import type { Module } from "@akasha/code-system/module"

export const scrollableMenuButtongroup = {
  id: "01a06275-c443-732e-93a1-d70a36b10e6c",
  pageTypeSlug: "module",
  slug: "scrollable-menu-buttongroup",
  definition: "the subclass of ZO_RadioButtonGroup the checkbox and radio rows share",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each button's original OnClicked handler is stored and restored on removal.",
    },
    {
      invariantKind: "departure",
      statement: "A radio button alone has its click handler replaced.",
    },
    {
      invariantKind: "departure",
      statement: "Check-all and invert are carried out by driving each button's original handler.",
    },
    {
      invariantKind: "departure",
      statement: "A click is checked against the context menu before the group handles the click.",
    },
  ],
} as const satisfies Module
