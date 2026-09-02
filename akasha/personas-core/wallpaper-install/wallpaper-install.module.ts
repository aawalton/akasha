import type { Module } from "../../code-system/modules/module.page-type.ts"

export const wallpaperInstall = {
  id: "01a05b70-a58d-75f1-8f4c-9f1cd5f4d1d7",
  pageTypeSlug: "module",
  slug: "wallpaper-install",
  definition: "where a persona's new wallpaper is written and which older ones go",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An older wallpaper goes only where the older wallpaper names the same persona at the same level.",
    },
    {
      invariantKind: "departure",
      statement: "A file the wallpaper name shape does not fit is left alone.",
    },
  ],
} as const satisfies Module
