import type { Module } from "../../code-system/modules/module.page-type.ts"

export const wallpaperRecord = {
  id: "01a05b70-a58d-713d-9f6d-5d268721e317",
  pageTypeSlug: "module",
  slug: "wallpaper-record",
  definition: "the record written for a persona's wallpaper at a level",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A root left unstated is left out of the record rather than set to nothing.",
    },
  ],
} as const satisfies Module
