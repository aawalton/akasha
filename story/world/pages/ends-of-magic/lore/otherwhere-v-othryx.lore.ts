import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVOthryx = {
  id: "01a0e9fb-6916-707e-b602-47c522d6a678",
  type: "page-type/lore",
  slug: "otherwhere-v-othryx",
  title: "Othryx",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-othryx",
  facts: [
    {
      fact: "Othryx is an eclipsemaw, a huge monster that lurked beneath the Sawtooth Gulf.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Questors Sarya and Brox tracked Othryx before the Ending of Wrath.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Othryx is known only from tales of the age before the Ending of Wrath.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
