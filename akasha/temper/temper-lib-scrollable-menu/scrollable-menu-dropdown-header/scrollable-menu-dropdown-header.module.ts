import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownHeader = {
  id: "01a06275-c448-77b6-b7de-356d17d15a95",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-header",
  definition: "the numbered header child controls and the anchor sets each one takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Header children are addressed by integer id rather than by control name.",
    },
    {
      invariantKind: "departure",
      statement: "Anchors are declared once as objects and reapplied on every refresh.",
    },
    {
      invariantKind: "departure",
      statement: "A divider row is inserted between header children by an id comparison.",
    },
    {
      invariantKind: "constraint",
      statement: "A header carrying a filter box is widened to the search-header minimum.",
    },
  ],
} as const satisfies Module
