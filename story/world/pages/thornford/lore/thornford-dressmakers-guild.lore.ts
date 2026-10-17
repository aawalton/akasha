import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const thornfordDressmakersGuild = {
  id: "01a14b77-c979-7bab-84ca-f5e65acd9ae8",
  type: "page-type/lore",
  slug: "thornford-dressmakers-guild",
  title: "The Dressmakers' Guild",
  world: "world/thornford",
  about: "world-organization/thornford-dressmakers-guild",
  facts: [
    {
      fact: "Only members of the dressmakers' guild may sell a new-made gown in Thornford.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Anyone outside the guild may mend, alter and make plain work.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "An outsider caught selling a gown is fined by the burgh, and loses her shop the second time.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Nala is not a member of the guild.",
      knowers: ["lore-disclosure/game-master", "character-player/thornford-nala"],
    },
    {
      fact: "Every guild dressmaker turned away the Spring Court's commission for a Beltane gown.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
    {
      fact: "The guild's warden forbade its members to take the Spring Court's commission.",
      knowers: ["lore-disclosure/game-master", "character-other/thornford-shaestrel"],
    },
  ],
  createdAt: "2026-10-17T20:05:03.992Z",
  updatedAt: "2026-10-17T20:05:03.992Z",
} as const satisfies Lore
