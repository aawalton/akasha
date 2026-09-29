import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvGrakk = {
  id: "01a0ed2e-7553-76e8-82c6-3a05a284b647",
  type: "page-type/lore",
  slug: "overwhere-iv-grakk",
  title: "Grakk",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Grakk is a hobgoblin who evolved from a goblin, LV 18.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Grakk is cunning, and his raids on the sheep are well planned.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
