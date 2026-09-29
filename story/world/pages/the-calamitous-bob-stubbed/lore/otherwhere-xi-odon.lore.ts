import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiOdon = {
  id: "01a0ea82-d976-7f5d-b839-3e93d8d61f8b",
  type: "page-type/lore",
  slug: "otherwhere-xi-odon",
  title: "Odon",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-odon",
  facts: [
    {
      fact: "Odon the Bellicose is a kark warrior of the Hollow Tooth clan.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Odon was banished from the Mountain Tribe as a murderer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Odon's inspection reads: Tipped Juggernaut, fourth step, armored battlefield dominance.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Odon fought for Marruk in the Red Tribe's war on the Pure League.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Odon leads the kark mercenaries Marruk left in his keeping.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
