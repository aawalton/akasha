import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveGorgon = {
  id: "01a0e9f2-0aaf-713f-8794-cd6f18c532be",
  type: "page-type/lore",
  slug: "super-supportive-gorgon",
  title: "Gorgon",
  world: "world/super-supportive",
  about: "character-other/super-supportive-gorgon",
  facts: [
    {
      fact: "He is about five feet tall, with smooth gray skin like a stingray's and black shark-like eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
