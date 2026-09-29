import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiCernit = {
  id: "01a0ea7a-6437-79a6-a074-16275f544c11",
  type: "page-type/lore",
  slug: "otherwhere-xi-cernit",
  title: "Cernit",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-cernit",
  facts: [
    {
      fact: "Captain Cernit was a Baranese knight of minor nobility from the marches near Halluria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cernit had a wife and three sons who rode with him as hedge knights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cernit's name is tied to a doomed defense of Fort Sky.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv marched with Cernit's company through Baran's marches in her first winter mobilized.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Cernit's company took a border fort, and he was weighed for the Order of the White Orchard.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv counts Cernit among the friends she has lost; he is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
