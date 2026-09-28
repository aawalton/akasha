import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereBasilisk = {
  id: "01a0e9c4-861d-7f99-ab5a-905b017b42f8",
  type: "page-type/lore",
  slug: "otherwhere-basilisk",
  title: "The Basilisk",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The basilisk is a four-star roaming monster, a snake the size of a redwood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its gaze paralyzes anything that meets it until it looks away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It hunts at night and can destroy a town's core in a flash.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
