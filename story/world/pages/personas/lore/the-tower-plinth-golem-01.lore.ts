import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerPlinthGolem01 = {
  id: "01a0d44f-6473-7a8f-9ed8-5bb71bac30ac",
  type: "page-type/lore",
  slug: "the-tower-plinth-golem-01",
  title: "The Plinth Golem",
  world: "world/personas",
  about: "character-other/the-tower-plinth-golem-01",
  facts: [
    {
      fact: "The Plinth Golem is dead, drained of its heat and broken to slag, its core taken.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
