import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiJar = {
  id: "01a0ea87-2a4e-77e7-bf9a-dbc98325404a",
  type: "page-type/lore",
  slug: "otherwhere-xi-jar",
  title: "Jar",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-jar",
  facts: [
    {
      fact: "Jar was a griffin rider of Helock, among the city's elite shock troops.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jar flew against Viv when she broke out of Helock's town hall keep.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv and Arthur brought Jar down in that fight; he is believed dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
