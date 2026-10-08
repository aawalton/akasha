import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWordchain = {
  id: "01a0e9f1-065f-7a9f-8d7b-8a29416dd150",
  type: "page-type/world-mechanic",
  slug: "super-supportive-wordchain",
  title: "Wordchain",
  world: "world/super-supportive",
  aliases: ["chain", "chaining"],
  description:
    "An Artonan chain of words and hand signs that trades with an Opposite on another world.",
  createdAt: "2026-09-28T21:34:42.271Z",
  updatedAt: "2026-09-28T21:34:45.000Z",
} as const satisfies WorldMechanic
