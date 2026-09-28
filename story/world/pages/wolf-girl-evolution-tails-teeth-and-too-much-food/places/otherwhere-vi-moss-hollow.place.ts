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
    {
      fact: "Many voices howl together from the forest north of the hollow at night.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "The hollow is cold at night, cold enough that breath shows in the air.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "The hollow's stream runs south, and in a day's walk joins the river Carrow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Following the stream and then the Carrow downstream leads to Brackenford in a day and a half.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No path reaches the hollow; a deer trail crosses the stream just below it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lingonberries and blueberries ripen on the slopes round the hollow; they are safe to eat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pale-gilled white mushrooms by the boulders are deathcaps, and kill in a day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brown ceps under the pines are good eating; pine cones hold small sweet nuts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Small trout hold in the stream's pools, catchable by hand with patience.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A cleft between two boulders on the west rim is dry and out of the wind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dead pine branches and dry moss lie thick under the trees; the hollow's own moss is soaked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Flints lie in the stream bed; struck on each other they spark weakly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rabbits and squirrels are common round the hollow; deer come to the stream at dusk.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Just below the hollow a narrow trodden line crosses the stream, its mud marked by split hoof prints.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
  ],
  within: "place/otherwhere-vi-greypine-weald",
  exits: [
    {
      to: "place/otherwhere-vi-howling-stones",
      way: "half a day north through the pines, uphill",
      direction: "north",
    },
    {
      to: "place/otherwhere-vi-brackenford",
      way: "down the stream, then along the Carrow, a day and a half",
      direction: "south",
    },
    {
      to: "place/otherwhere-vi-sallow-mire",
      way: "half a day west, downhill through thinning pines",
      direction: "west",
    },
    {
      to: "place/otherwhere-vi-kestrel-tower",
      way: "a day east over two ridges",
      direction: "east",
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
