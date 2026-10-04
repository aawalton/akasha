import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherUnderbloom = {
  id: "01a10498-7188-7568-a0de-a92e1e0e87ce",
  type: "page-type/place",
  slug: "fairweather-underbloom",
  title: "The Underbloom",
  world: "world/fairweather",
  within: "place/fairweather-lanternmere",
  facts: [
    {
      fact: "The Underbloom is reached by a stone stair down from the dry fountain in the old flower market.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "The old flower market is an iron-and-glass hall where sellers still set out stalls each morning.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
        "character-other/fairweather-tilly",
      ],
    },
    {
      fact: "A guild clerk at the stair head licenses parties down, a lantern a party, and logs them in and out.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "The first floor is old brick cellars overgrown with pale flowers that glow, so it needs no lamp.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "The first floor is counted safe for F-rank, and a locked guild gate bars the stair to the second.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "Bloom beetles the size of a cat graze the first floor's flowers, and nip only when handled.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "Stranglevine grows over the side passages and holds whatever brushes it until it is cut or burnt.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-tamsin",
      ],
    },
    {
      fact: "The lost goat is Clover, a white nanny goat belonging to a flower seller in the market above.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clover went down the stair after a dropped bunch of flowers three days ago and has not come up.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clover is in the old cistern room at the first floor's heart, eating the glowing flowers.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stranglevine has grown across the cistern room's doorway since Clover went in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A goat that eats the glowing flowers glows faintly itself for a day after.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
