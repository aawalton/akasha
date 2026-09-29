import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDirge = {
  id: "01a0ea7c-0782-75ce-8acb-00ffbcfb0066",
  type: "page-type/lore",
  slug: "otherwhere-xi-dirge",
  title: "Professor Dirge",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-dirge",
  facts: [
    {
      fact: "Professor Dirge is the flamboyant duelling teacher of the Helock Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dirge has dark curls and liquid eyes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dirge agreed to teach Viv duelling, and later taught Rakan as well.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dirge was on the Academy's staff when it fled Oleander's conquest of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Dirge is thought to be among the Academy folk in exile from Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
