import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageBoardDndHelpers = {
  id: "01a05c3b-4fc4-752f-bd8a-d661af0f143b",
  type: "page-type/module",
  slug: "page-board-dnd-helpers",
  definition:
    "Maps a pointer X to the board column key it falls in, clamping to the first or last column.",
  code: "ts",
  createdAt: "2026-09-01T09:09:46.052Z",
  updatedAt: "2026-09-15T18:36:57.000Z",
} as const satisfies Module
