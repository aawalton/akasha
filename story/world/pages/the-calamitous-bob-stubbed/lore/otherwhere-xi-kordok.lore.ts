import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiKordok = {
  id: "01a0ea8a-d22b-748b-92a7-81feb2d1d5fd",
  type: "page-type/lore",
  slug: "otherwhere-xi-kordok",
  title: "Kordok",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-kordok",
  facts: [
    {
      fact: "Kordok was a Royal Jailor of Enoria, a huge bald martial artist.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kordok's Royal Jailor skill bound him to a captive's soul, keyed to their emotions.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The royal jailors' motto is Compliance leads to peace.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kordok held Viv prisoner for the royalists and treated her decently.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sangor's team killed Kordok at the fall of Green Edge; Kordok is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
