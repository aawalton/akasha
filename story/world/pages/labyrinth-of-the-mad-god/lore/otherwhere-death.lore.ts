import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereDeath = {
  id: "01a0e9a5-b2a2-7e08-9921-f012b89fc3fb",
  type: "page-type/lore",
  slug: "otherwhere-death",
  title: "Death and Healing",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "Death is final; the System does not revive the fallen.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The System warns when a challenge offers no safety and survival is not guaranteed.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wounds heal fast in enhanced bodies, and bruises fade by the next morning.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Healing potions are common rewards, while healing magic is rare.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Potions and elixirs restore vital energies and close wounds.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
