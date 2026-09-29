import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLyssa = {
  id: "01a0ea8f-a12c-7390-b726-877d6ac5fb85",
  type: "page-type/lore",
  slug: "otherwhere-xi-lyssa",
  title: "Lyssa",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-lyssa",
  facts: [
    {
      fact: "Lyssa was a young apprentice of the assassins' guild under Helock's warehouse district.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv killed Lyssa the night Solfis's teams wiped out the assassins' guild; Lyssa is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
