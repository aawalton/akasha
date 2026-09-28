import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dragonsAndDungeonsTheCrossing = {
  id: "01a0e396-9d95-7360-a6a8-9713f56fc3b2",
  type: "page-type/place",
  slug: "dragons-and-dungeons-the-crossing",
  title: "The Crossing",
  world: "world/personas",
  exits: [
    {
      to: "place/dragons-and-dungeons-the-kin-fire-ring",
      way: "North on foot, up into the high cold country.",
      direction: "north",
    },
    {
      to: "place/dragons-and-dungeons-the-stillwater",
      way: "Poled across the wide water by barge, a long slow crossing.",
    },
  ],
  facts: [
    {
      fact: "The crossing is an old worked river crossing with a rotted jetty.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Slavers re-braced the jetty's pilings with fresh timber.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "Every line on Wren's map that touches water bends through the crossing.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "Three low slatted wooden cages sit at the head of the jetty, all open now.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The four slavers of the crossing crew and the hauler who talked lie dead there.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Across the wide bright water, under haze, is the Stillwater's far shore.",
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
