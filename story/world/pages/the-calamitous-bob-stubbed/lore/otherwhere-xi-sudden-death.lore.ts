import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSuddenDeath = {
  id: "01a0ea82-747e-7e4e-a96e-5b31c912941e",
  type: "page-type/lore",
  slug: "otherwhere-xi-sudden-death",
  title: "Sudden Death",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-sudden-death",
  facts: [
    {
      fact: "The Sudden Death is a pink worm as thick as a tree trunk; the kark call it Sha.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sudden Death's mouth holds three fangs that curve inward.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sudden Death swims through the earth with earth magic and strikes from below.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Sudden Death lives on the kark steppes and eats kark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ground soaked with black mana stops an earth-swimming worm from moving through it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
