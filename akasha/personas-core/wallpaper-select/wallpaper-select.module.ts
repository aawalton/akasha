import type { Module } from "../../code-system/modules/module.page-type.ts"

export const wallpaperSelect = {
  id: "01a05b70-a58d-7a1f-aa38-1dbe316d32ec",
  pageTypeSlug: "module",
  slug: "wallpaper-select",
  definition: "which wallpaper is picked from the candidates on hand",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A persona is picked before one of her wallpapers is.",
    },
    {
      invariantKind: "departure",
      statement: "A follow pick takes the highest level at or under the one asked for.",
    },
  ],
} as const satisfies Module
