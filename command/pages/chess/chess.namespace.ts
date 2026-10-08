import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const chess = {
  id: "01a0a040-5c4d-721b-9a58-8152382ae8f2",
  type: "page-type/namespace",
  slug: "chess",
  definition: "the games Alan plays out against a model and the puzzles kept beside them",
  parts: ["command/chess-play", "module/chess-page-writing", "namespace/chess-puzzles"],
  name: "chess",
  createdAt: "2026-09-14T14:09:27.629Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
