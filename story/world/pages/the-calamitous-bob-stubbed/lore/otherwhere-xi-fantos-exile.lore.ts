import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiFantosExile = {
  id: "01a0ea82-c1aa-7ea2-8c92-be929ad31028",
  type: "page-type/lore",
  slug: "otherwhere-xi-fantos-exile",
  title: "Fantos Exile",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-fantos-exile",
  facts: [
    {
      fact: "Fantos Exile is a gray-skinned Shadowlander blade master in the Azure Lady's service.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fantos strikes with a blade of light shaped by pure intent.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fantos has an expert intimidation skill, likely won by slaying great beasts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fantos fought Viv at the Azure Lady's haven, and she kicked him away and humiliated him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Fantos is thought to be with the Azure Lady's exiles at End of the World.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
