import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFarvaleSnake = {
  id: "01a0ea82-747d-728b-a334-ee7f7c026a2e",
  type: "page-type/lore",
  slug: "otherwhere-xi-farvale-snake",
  title: "Farvale Snake",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-farvale-snake",
  facts: [
    {
      fact: "A farvale snake is eel-like; it poisons its prey and strangles it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farvale snakes live in the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Travellers in the Deadshield Woods roast farvale snake on skewers.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
