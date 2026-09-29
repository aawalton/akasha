import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiSnakehound = {
  id: "01a0ea81-9844-7055-964e-a5cfb8ceabb2",
  type: "page-type/lore",
  slug: "otherwhere-xi-snakehound",
  title: "Snakehound",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-species/otherwhere-xi-snakehound",
  facts: [
    {
      fact: "Snakehounds are scaly pack beasts, kin to scalehounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Snakehounds hunt in the Deadshield Woods among its many monsters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mercenary band called the Silver Snakehounds took its name from the beast.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
