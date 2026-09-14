import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const chess = {
  id: "01a0a040-5c4d-721b-9a58-8152382ae8f2",
  type: "namespace",
  slug: "chess",
  definition: "the games Alan plays out against a model and the puzzles kept beside them",
  parts: ["command/chess-play"],
  name: "chess",
} as const satisfies Namespace
