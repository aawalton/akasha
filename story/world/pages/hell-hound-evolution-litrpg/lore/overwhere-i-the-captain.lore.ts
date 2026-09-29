import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereITheCaptain = {
  id: "01a0ed25-1dc5-7a10-813f-5c830e1b9045",
  type: "page-type/lore",
  slug: "overwhere-i-the-captain",
  title: "The Captain",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "The Captain is a man of the Bloody Peaks Tribe whose son died following Valrok.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He leads dissent against Valrok within the tribe.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He disputed Elva's claim to the Chardbark Colossus kill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His daughter wanted Iris for her own.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He is at the Bloody Peaks now.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
