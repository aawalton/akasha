import type { Module } from "@akasha/code-system/module"

export const submenuItem = {
  id: "01a0605a-5820-77e8-af26-680a7db72e96",
  pageTypeSlug: "module",
  slug: "submenu-item",
  definition: "the row that opens a sub-menu when the mouse rests on it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row carrying a sub-menu shows an arrow at its right edge.",
    },
  ],
} as const satisfies Module
