import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiVarrowKeep = {
  id: "01a0ed20-ba0b-75a5-a35c-11a2e8ad6314",
  type: "page-type/place",
  slug: "overwhere-ii-varrow-keep",
  title: "Varrow Keep",
  world: "world/sovereign-sight-progression-fantasy-cultivation",
  within: "place/overwhere-ii-wendlemere",
  facts: [
    {
      fact: "Varrow Keep is an old grey tower-house on a crag at the valley's east end, a day from the Ford.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Thirty men-at-arms and a dozen servants live in the Keep, and its roofs leak.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Four Talented serve Lady Varrow, none past First Depth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Keep's gate is barred at dusk, and the Lady receives no one after dark.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The road from the Ford to the Keep runs east up the valley, past scattered farms.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "A guest who reaches the Keep after noon is fed and lodged, and the Lady receives them next morning.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The Keep's roofs are patched, its walls stained dark with old rain.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The Lady receives guests in a long, draughty hall up a winding stair, a fire smoking at one end.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "Lady Varrow seals a free blade's bond with a clasp of hands before a witness, written in the rolls.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The Keep gives Nala a room at the top of its old north stair: bare, quiet, with a shuttered window.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-ii-nala"],
    },
    {
      fact: "The north stair room looks over the valley to the Whitecombs, and no one else sleeps on that stair.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A free blade at the Keep eats in the hall with the Talented, at the second table.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Keep's well is in its lower court, deep and cold, fed from the crag's spring.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
