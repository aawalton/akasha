import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSpindlecalf = {
  id: "01a0ea89-57b6-742b-ba8f-ecb10bc87f25",
  type: "page-type/lore",
  slug: "otherwhere-xi-spindlecalf",
  title: "Spindlecalf",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-spindlecalf",
  facts: [
    {
      fact: "Spindlecalf is a tame giant spider, the mount of the merl rider Gillis.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merls ride domesticated giant spiders like Spindlecalf.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "This season Spindlecalf is with the merls of Sikoua in the Deadshield Woods.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
