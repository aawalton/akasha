import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameGrace = {
  id: "01a0de59-9645-7aea-990a-495537012364",
  type: "page-type/lore",
  slug: "the-dating-game-grace",
  title: "Grace",
  world: "world/personas",
  about: "persona/grace",
  facts: [
    {
      fact: "Grace lives in a quiet rented house on Apple Avenue in Provo.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
