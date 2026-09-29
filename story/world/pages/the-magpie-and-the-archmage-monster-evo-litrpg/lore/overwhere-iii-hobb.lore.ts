import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiHobb = {
  id: "01a0ed33-882c-7ee3-96b1-2a651406b8c1",
  type: "page-type/lore",
  slug: "overwhere-iii-hobb",
  title: "Hobb",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-hobb",
  facts: [
    {
      fact: "Hobb is the south gate's watchman, a paunchy man of fifty in a dented helm, Level 9.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He keeps the gate book, asks every stranger a name and a reason, and yawns through both.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is lazy but not unkind, and gossips with Tobin Wick every cart day.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
