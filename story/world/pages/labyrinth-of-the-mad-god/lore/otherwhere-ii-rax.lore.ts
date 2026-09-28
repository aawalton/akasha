import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiRax = {
  id: "01a0e9c2-1a5b-7d6a-ace0-3fd7c5fbe4db",
  type: "page-type/lore",
  slug: "otherwhere-ii-rax",
  title: "Rax",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "A rax is a wingless dragon-like lizard with spiraling black horns.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Adults grow a thousand feet long and rest so still they look like stone spires.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It fires a beam of light mana that can level a small mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
