import type { Module } from "@akasha/code-system/module"

export const scrollableMenuCasts1b = {
  id: "01a06275-c443-74d3-95bf-8e3d22f7d594",
  pageTypeSlug: "module",
  slug: "scrollable-menu-casts-1b",
  definition: "the narrowing helpers for shapes named from ContextMenuDropdown through GetValue",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each helper performs a bare TypeScript cast and returns the value unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "The cast is not guarded by any runtime check.",
    },
    {
      invariantKind: "constraint",
      statement: "Membership of this half is decided by the alphabetical name of the target type.",
    },
    {
      invariantKind: "departure",
      statement: "Method-bearing shapes are spelled out inline as structural object types.",
    },
  ],
} as const satisfies Module
