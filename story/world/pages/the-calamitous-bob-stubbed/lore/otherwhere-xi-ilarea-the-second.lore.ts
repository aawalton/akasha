import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiIlareaTheSecond = {
  id: "01a0ea86-90b2-7545-bafd-4cdeea896d5b",
  type: "page-type/lore",
  slug: "otherwhere-xi-ilarea-the-second",
  title: "Ilarea the Second",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-ilarea-the-second",
  facts: [
    {
      fact: "Ilarea the Second was the last Empress of old Harrak, an archmage in her own right.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ilarea was young and pregnant when the empire fell three centuries ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Solfis would have had to obey Ilarea had she lived to command him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Solfis once suspected Ilarea of steering the undead horde; the true culprit was Semeryss.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ilarea is dead; what became of her unborn child is unknown.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
