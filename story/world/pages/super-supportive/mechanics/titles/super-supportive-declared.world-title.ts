import type { WorldTitle } from "akasha/story/world/mechanics/titles/world-title.page-type.types.ts"

export const superSupportiveDeclared = {
  id: "01a0e9f9-7734-777c-a469-2b8e31d11a1c",
  type: "page-type/world-title",
  slug: "super-supportive-declared",
  title: "Declared",
  world: "world/super-supportive",
  aliases: ["declared", "knightling"],
  description:
    "The title of someone who has chosen to become a knight and passed the oath ceremony but not yet had a first binding.",
} as const satisfies WorldTitle
