import type { Module } from "@akasha/code-system/module"

export const pageBoardDndHelpers = {
  id: "01a05c3b-4fc4-752f-bd8a-d661af0f143b",
  pageTypeSlug: "module",
  slug: "page-board-dnd-helpers",
  definition:
    "Maps a pointer X to the board column key it falls in, clamping to the first or last column.",
  code: "ts",
} as const satisfies Module
