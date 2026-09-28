import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxVampire = {
  id: "01a0ea37-3f80-7881-a136-83edb2fc8d99",
  type: "page-type/lore",
  slug: "otherwhere-ix-vampire",
  title: "Vampire",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-species/otherwhere-ix-vampire",
  facts: [
    {
      fact: "Vampires are known across Entrerea mostly from myth, rumour and cheap romance stories.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A popular romance in Sun City's library is titled “I Married a Vampire and Now Everything Sucks”.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the Malari lands, some afflictions and effects are rumoured to go along with vampirism.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Malari lords who hear of bled or wasted villagers may whisper of vampires before anything else.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one in Sun City can say for certain whether vampires truly live on Firrelia.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
