import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiChewyLeg = {
  id: "01a0ea83-ee7a-7cbc-acfb-032ff3e82c04",
  type: "page-type/lore",
  slug: "otherwhere-xi-chewy-leg",
  title: "Chewy-Leg",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-chewy-leg",
  facts: [
    {
      fact: "A chewy-leg is an eight-armed sea predator with a beak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A chewy-leg hurls balls of water with magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Chewy-legs live in the sea off Helock, and young dragons hunt them.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
