import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVZombie = {
  id: "01a0e9fb-482c-7be4-9ee0-af73b538d28f",
  type: "page-type/lore",
  slug: "otherwhere-v-zombie",
  title: "Zombie",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-zombie",
  facts: [
    {
      fact: "Zombies are corpses risen to walk as undead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A buried corpse without rock heaped over it may rise as undead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Zombies can be raised by death magic and made to obey whoever raised them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
