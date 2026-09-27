import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dragonsAndDungeonsTheDrownedHall = {
  id: "01a0e396-9d95-7f03-a78a-8fe381cfc260",
  type: "page-type/place",
  slug: "dragons-and-dungeons-the-drowned-hall",
  title: "The Drowned Hall",
  world: "world/personas",
  within: "place/dragons-and-dungeons-the-stillwater",
  secrets: "jsonl",
  exits: [
    {
      to: "place/dragons-and-dungeons-the-stillwater",
      way: "Down the broken stair to the quay.",
    },
    {
      to: "place/dragons-and-dungeons-the-chancel",
      way: "Across the flooded hall and through the great torchlit archway.",
    },
  ],
  facts: [
    {
      fact: "The hall is vast and half-flooded, a black sheet of water over its floor.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Stubs of fallen columns break the hall's standing water.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Rooms of the upper reach hold dry slabs and a broken balustrade over the flood.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "A short stair climbs from the upper reach toward the inner dark.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "The keepers of the upper reach lie dead through its rooms.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
  ],
} as const satisfies Place
