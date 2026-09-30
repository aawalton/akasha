import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIStarfallLegacy2 = {
  id: "01a0f459-2091-70b5-82dd-d0dc6b356ddf",
  type: "page-type/lore",
  slug: "overwhere-i-starfall-legacy-2",
  title: "Starfall Legacy, continued",
  world: "world/hell-hound-evolution-litrpg",
  about: "overwhere-i-legacy/overwhere-i-starfall-legacy",
  facts: [
    {
      fact: "The earth-and-air ripple is a Weave use, easy to read in a den, reaching about thirty yards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The earth-and-air ripple works in dry ground and wet alike.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An earth-and-air ripple feels hollows and moving air sharply, but living bodies only faintly.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "No System window names a thing she finds; she learns what it is from someone who knows.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
