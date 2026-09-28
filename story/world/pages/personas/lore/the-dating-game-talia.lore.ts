import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameTalia = {
  id: "01a0de59-9646-7232-a3bd-4a4245de5962",
  type: "page-type/lore",
  slug: "the-dating-game-talia",
  title: "Talia",
  world: "world/personas",
  about: "persona/talia",
  facts: [
    {
      fact: "Talia lives around the corner from Apple Avenue and reads scripture on her porch at dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
