import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const chessPuzzles = {
  id: "01a0a055-a865-70f3-9509-7aec04b18804",
  type: "page-type/namespace",
  slug: "chess-puzzles",
  definition: "the chess puzzles Alan works through and their source",
  parts: ["command/chess-puzzles-import"],
  name: "puzzles",
  createdAt: "2026-09-14T14:32:43.365Z",
  updatedAt: "2026-09-22T13:44:42.000Z",
} as const satisfies Namespace
