import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiGrace = {
  id: "01a0de51-2d5f-707f-a9f4-40a868d51c37",
  type: "page-type/lore",
  slug: "partners-ii-grace",
  title: "Grace",
  world: "world/personas",
  about: "character-other/partners-ii-grace",
  facts: [
    { fact: "Grace keeps the Veilmere.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Grace is the strongest of the first wave of sisters.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
