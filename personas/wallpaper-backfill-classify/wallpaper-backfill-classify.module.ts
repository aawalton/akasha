import type { Module } from "../../code-system/modules/module.page-type.ts"

export const wallpaperBackfillClassify = {
  id: "01a05b70-a58d-7bfd-877a-45b85a85d661",
  pageTypeSlug: "module",
  slug: "wallpaper-backfill-classify",
  definition: "whether a delivered wallpaper's source image can still be pointed at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A source is taken as confident only where an upscale run delivered that filename.",
    },
    {
      invariantKind: "departure",
      statement: "A delivery naming no file has no source.",
    },
  ],
} as const satisfies Module
