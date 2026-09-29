import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiNoxite = {
  id: "01a0ea7f-9f47-7408-80d1-22a539711e6f",
  type: "page-type/lore",
  slug: "otherwhere-xi-noxite",
  title: "Noxite",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-noxite",
  facts: [
    {
      fact: "Noxites are see-through spiders, hard to spot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Noxites crawl into sleepers' ears to lay their eggs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Noxites burrow, and they come with the spider swarms of the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
