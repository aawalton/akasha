import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const thornfordMoragBain = {
  id: "01a14b77-c97a-750a-bd81-c09f501da3e7",
  type: "page-type/lore",
  slug: "thornford-morag-bain",
  title: "Morag Bain",
  world: "world/thornford",
  about: "character-other/thornford-morag-bain",
  facts: [
    {
      fact: "Morag Bain is the warden of Thornford's dressmakers' guild.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Morag keeps the widest shop at the top of Weavers' Row.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Morag owns the building Nala's shop is in, and collects its rent.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Thirty years ago Morag's elder sister Eilidh owed the Spring Court a year of sewing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eilidh went across the ford to serve her year and never came back.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Eilidh's bargain counted a year as the Spring Court counts one, and she sews there still.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Morag turned Shaestrel away at her own shop, and told her where to find Nala.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "Morag has a sharp tongue, and uses it on any seamstress in Thornford outside the guild.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-10-17T20:05:03.992Z",
  updatedAt: "2026-10-17T21:37:13.143Z",
} as const satisfies Lore
