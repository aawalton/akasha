import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIGreyfenFord = {
  id: "01a0ed0c-123a-7089-a6e4-7bfddec2a865",
  type: "page-type/place",
  slug: "overwhere-i-greyfen-ford",
  title: "Greyfen Ford",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "Greyfen Ford is a shallow stone ford where a forest cart track crosses a clear, cold stream.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "Tall dark pines crowd both banks, and the far bank climbs to a ridge of bare grey rock.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "Wheel ruts and the prints of hooves and large paws mark the mud at the water's edge.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "Thin chimney smoke rises beyond the ridge to the east, perhaps an hour's walk away.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "The ford lies at the wild edge of settled land, far from where the canon's people are.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Beasts of this world come down to drink at the ford at dawn and dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
