import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIiShadowHunt = {
  id: "01a0e9c1-484d-7d1c-bc74-8e6dd91d957a",
  type: "page-type/lore",
  slug: "otherwhere-ii-shadow-hunt",
  title: "The Shadow Hunt",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The shadow hunt is a pack of fell hounds that rides in on the blackmist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lord of the shadow hunt is a colossal hound that dwarfs every other bog predator.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Being caught by the hunt in open ground is death for a weak party.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
