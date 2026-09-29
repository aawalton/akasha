import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiTalyris = {
  id: "01a0ea84-fb2a-71b1-bdd1-6699f783039e",
  type: "page-type/place",
  slug: "otherwhere-xi-talyris",
  title: "Talyris",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-param",
  facts: [
    {
      fact: "Talyris is a northern city-state on the north shore of the River Shal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talyris is the last river stop on the Shal before Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Talyris is one of the northern city-states past Enoria's last river town, Markeis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Northern Shal towns like Talyris have cubic, brightly painted houses and spicy street food.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
