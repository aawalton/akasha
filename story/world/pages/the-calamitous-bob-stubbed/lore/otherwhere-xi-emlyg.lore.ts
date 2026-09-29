import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiEmlyg = {
  id: "01a0ea80-8c28-7d9a-ad7e-d83fe85cc816",
  type: "page-type/lore",
  slug: "otherwhere-xi-emlyg",
  title: "Emlyg the Undying",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-emlyg",
  facts: [
    {
      fact: "Emlyg the Undying was a bounty hunter who led a crew out of the smugglers' town of Koltis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Emlyg hunted Viv for the royalist bounty when she fled north through Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur killed Emlyg; despite his name, Emlyg the Undying is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
