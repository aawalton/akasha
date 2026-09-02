import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownClassSearch = {
  id: "01a06275-c448-784f-b2c1-a28462d70542",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-class-search",
  definition: "the mouse-up, selection and show-hide methods of the dropdown object",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The file name says search while the methods here handle mouse-up and selection.",
    },
    {
      invariantKind: "departure",
      statement:
        "Right-clicking a row runs the entry's context-menu callback instead of selecting it.",
    },
    {
      invariantKind: "departure",
      statement: "Three preventer variables are cleared at the top of every mouse-up.",
    },
    {
      invariantKind: "departure",
      statement: "A submenu inherits multi-select from its parent menu on the first click.",
    },
  ],
} as const satisfies Module
