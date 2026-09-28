import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVRodOfAnnihilation = {
  id: "01a0ea03-e06e-73ba-85ec-c73f80bd5a71",
  type: "page-type/lore",
  slug: "otherwhere-v-rod-of-annihilation",
  title: "Rod of Annihilation",
  world: "world/ends-of-magic",
  about: "world-item/otherwhere-v-rod-of-annihilation",
  facts: [
    {
      fact: "Davrar's magic can create antimatter, which a rod of annihilation holds in a field.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Snapping a rod of annihilation detonates it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antimagic cannot touch a rod of annihilation without breaking its containment.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rods of annihilation are counted among the doomsday weapons Questors hoard.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
