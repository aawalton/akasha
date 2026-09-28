import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dragonsAndDungeonsTheChancel = {
  id: "01a0e396-9d94-78b7-b347-69fc775c4e4a",
  type: "page-type/place",
  slug: "dragons-and-dungeons-the-chancel",
  title: "The Chancel",
  world: "world/personas",
  within: "place/dragons-and-dungeons-the-stillwater",
  exits: [
    {
      to: "place/dragons-and-dungeons-the-drowned-hall",
      way: "Back through the great torchlit archway.",
    },
    {
      to: "place/dragons-and-dungeons-the-well",
      way: "Down the flooded ramp that spirals off to the side into the dark.",
      direction: "down",
    },
  ],
  facts: [
    {
      fact: "The chancel is a raised stone room, small, its floor broken by a great iron grate.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The grate is an oculus looking down into the flooded crypt of the Well.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "A wheel of dragon-iron sluices at the grate's lip is slagged by dragon-fire.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Tygryth's fire burned the Warden to ash in the chancel.",
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
