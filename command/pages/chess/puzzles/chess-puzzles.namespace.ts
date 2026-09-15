import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const chessPuzzles = {
  id: "01a0a055-a865-70f3-9509-7aec04b18804",
  type: "namespace",
  slug: "chess-puzzles",
  definition: "the chess puzzles Alan works through and where they were taken from",
  parts: ["command/chess-puzzles-import"],
  name: "puzzles",
} as const satisfies Namespace
