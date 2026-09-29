import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiTrez = {
  id: "01a0ea8a-f293-7cc5-97b6-7a11675369e6",
  type: "page-type/lore",
  slug: "otherwhere-xi-trez",
  title: "Trez",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-trez",
  facts: [
    {
      fact: "Lady Trez is the matriarch of House Trez, a noble family of Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lady Trez backed Prince Aldus in the Glastian succession contest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lady Trez offered Sidjin a pardon and immunity if he forfeited to Aldus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Lady Trez is in Helock, a city that sided with Maranor and now lacks leaders.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
