import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJaks = {
  id: "01a0ea88-c43c-7a84-b2ad-7cd2cc273d83",
  type: "page-type/lore",
  slug: "otherwhere-xi-jaks",
  title: "High Inquisitor Jaks",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jaks",
  facts: [
    {
      fact: "Jaks is the High Inquisitor of Neriad, whose seat is in the holy city of Mornyr.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jaks cleared Viv of suspicion, then heard her own confession to killing a bishop of Neriad.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mornyr lies blighted after Khaton rose there; Jaks's fate this season is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
