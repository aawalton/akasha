import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiWyrm = {
  id: "01a0ea81-9844-754b-a04a-bcb5b74c3439",
  type: "page-type/lore",
  slug: "otherwhere-xi-wyrm",
  title: "Wyrm",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-wyrm",
  facts: [
    {
      fact: "Wyrms haunt the gale-scoured slopes of the mountain of the gods, killing climbers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Earth wyrms live in Param's wild country and burrow through the ground.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travellers on Param's back roads fear earth wyrms alongside fang boars.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
