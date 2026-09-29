import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSerpentWolf = {
  id: "01a0ea83-ee7a-75f3-9661-a1300d3786ad",
  type: "page-type/lore",
  slug: "otherwhere-xi-serpent-wolf",
  title: "Serpent-Faced Wolf",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-serpent-wolf",
  facts: [
    {
      fact: "Serpent-faced wolves are tusked beasts that hunt in packs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A serpent-faced wolf hisses to spread panic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A serpent-faced wolf dodges so fast it leaves an after-image.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Serpent-faced wolves roam the monster-filled crags of the Baran-Halluria border.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
