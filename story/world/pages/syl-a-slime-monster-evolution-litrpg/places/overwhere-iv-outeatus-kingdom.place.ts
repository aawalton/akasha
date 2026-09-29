import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvOuteatusKingdom = {
  id: "01a0ed2e-489b-7b22-ac1f-d27bf60b3193",
  type: "page-type/place",
  slug: "overwhere-iv-outeatus-kingdom",
  title: "Outeatus Kingdom",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Outeatus Kingdom is a human realm and the sworn enemy of the elves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outeatus sent knights to assassinate the elf princess Sylthaeryn Feirelle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its agents still hunt anyone they take for an elf of the Feirelle line.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outeatus shelters and allies with the Dornhallow elves who fled the high court.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rumor blames Outeatus for the blast that destroyed the elven embassy in Dhoggurum.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outeatus lies among the human realms, with elven lands and Keld as its foes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
