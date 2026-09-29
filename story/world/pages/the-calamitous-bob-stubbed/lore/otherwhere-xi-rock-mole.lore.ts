import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiRockMole = {
  id: "01a0ea82-747e-794d-b967-2986685722f8",
  type: "page-type/lore",
  slug: "otherwhere-xi-rock-mole",
  title: "Rock Mole",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-rock-mole",
  facts: [
    {
      fact: "Rock moles burrow through stone and infest mines.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rock moles haunt the iron mines of Min Goles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Northern rock mole meat is greasy and gamey.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
