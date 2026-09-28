import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEclipsemaw = {
  id: "01a0e9fa-0d14-77ed-90a6-62b353554801",
  type: "page-type/lore",
  slug: "otherwhere-v-eclipsemaw",
  title: "Eclipsemaw",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-eclipsemaw",
  facts: [
    {
      fact: "Eclipsemaws are huge monsters, a hunt worthy of the mightiest Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The eclipsemaw Othryx lurked beneath the Sawtooth Gulf before the Ending of Wrath.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Questors Sarya and Brox tracked down Othryx together.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
