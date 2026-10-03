import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const pearl = {
  id: "01a0ddf8-63fd-788a-b374-75f30cb0f670",
  type: "page-type/lore",
  slug: "pearl",
  title: "Pearl",
  world: "world/the-beholder",
  about: "character-player/the-beholder-pearl",
  facts: [
    { fact: "Pearl is obsessed with beauty.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Pearl thinks about beautiful things the way other people pray.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl experiences beautiful things with worshipful, helpless hunger.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl's work is the dress kit, the threaded needle, and hem and strap repairs on the fly.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
