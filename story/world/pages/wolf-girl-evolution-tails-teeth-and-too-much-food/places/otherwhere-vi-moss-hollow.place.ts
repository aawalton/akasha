import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViMossHollow = {
  id: "01a0ea1c-a7ec-71b2-ac29-d9b5aea95e7c",
  type: "page-type/place",
  slug: "otherwhere-vi-moss-hollow",
  title: "Moss Hollow",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  facts: [
    {
      fact: "Moss Hollow is a dip among old pines, floored with deep moss and ringed by mossy boulders.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Two moons hang over the hollow at night, one large and pale, one small and faintly blue.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "The pines are tall and straight, their lowest branches far above head height.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "A cold stream runs along the hollow's east edge over flat grey stones.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "The stream water is clean and safe to drink.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wolves hunt these woods; their howls carry to the hollow from the north on clear nights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No person lives within a day's walk of the hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The nights here in early autumn are cold, near freezing before dawn.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
