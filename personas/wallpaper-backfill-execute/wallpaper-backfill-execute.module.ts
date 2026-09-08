import type { Module } from "../../code-system/modules/module.page-type.ts"

export const wallpaperBackfillExecute = {
  id: "01a05b70-a58d-7a94-8b42-b1fe59350cd9",
  pageTypeSlug: "module",
  slug: "wallpaper-backfill-execute",
  definition: "how a wallpaper restore backs off between attempts and what its outcome is called",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A delay doubles with each attempt up to a ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A restore is redone at the shorter of the image's two sides.",
    },
  ],
} as const satisfies Module
