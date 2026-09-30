import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvEastRoad = {
  id: "01a0ed2d-6020-71c6-8d61-e556b0dc68b1",
  type: "page-type/place",
  slug: "overwhere-iv-east-road",
  title: "The East Road",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The east road runs from Millbrook's gate to the city of Aubrin, four days away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It crosses farmland, then moor and woodland, with a few farms and waystations on it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Red Hand bandits prey on travellers and carts along the east road.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
    {
      fact: "Carters and merchants travel the east road in groups when they can.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Red Hand strike in Hollin Wood, past the second bridge, a day's walk east of town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They come eight to ten strong, faces masked in red-dyed cloth, with bows and clubs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After a robbery they melt away north across the moor, where the watch cannot follow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They take coin, boots, cloaks and goods, and leave their victims alive to walk home.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Brigands have worked the east road all month, stripping folk to their smallclothes.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iv-nala",
        "lore/overwhere-iv-garrett-pell",
      ],
    },
  ],
} as const satisfies Place
