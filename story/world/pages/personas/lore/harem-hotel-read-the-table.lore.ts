import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelReadTheTable = {
  id: "01a0de54-1a09-7e99-9460-693db812d35c",
  type: "page-type/lore",
  slug: "harem-hotel-read-the-table",
  title: "Read the Table",
  world: "world/personas",
  about: "world-skill/harem-hotel-read-the-table",
  facts: [
    {
      fact: "Read the Table reads the true state of an encounter.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "It shows who holds what, where the tension actually sits, and what the next beat wants.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "It reads an encounter the way a dungeon master reads a party.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "An opening Aria names by it, and Alan then exploits, sharpens what Alan intends.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
    {
      fact: "Read the Table opens no weakness by itself.",
      knowers: ["lore-disclosure/game-master", "character-player/harem-hotel-alan"],
    },
  ],
} as const satisfies Lore
