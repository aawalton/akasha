import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dragonsAndDungeonsTheWell = {
  id: "01a0e396-9d95-76ca-be07-857cd86a45e6",
  type: "page-type/place",
  slug: "dragons-and-dungeons-the-well",
  title: "The Well",
  world: "world/personas",
  within: "place/dragons-and-dungeons-the-stillwater",
  exits: [
    {
      to: "place/dragons-and-dungeons-the-chancel",
      way: "Up the flooded spiral ramp; long and dark, and it goes up.",
    },
  ],
  facts: [
    {
      fact: "The Well is a drowned crypt under the chancel, thigh-deep in black water.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The closed-eye sigil is cut into every wall of the Well.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "Channels cut around the Well's chamber carried the still one's blood away.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "The Well was a crypt where people were once laid to rest with care.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The Warden's alcove in the Well holds a collapsed lectern.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The Well's hoard-ledge held a cold bronze map and little else.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The kin-fire burns through the night beside the still one in the Well.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The throat-collar struck from the still one lies sunk in the Well's water.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-the-still-one",
      ],
    },
    {
      fact: "Dawn has risen over the Stillwater, far up the stair from the Well.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
  ],
} as const satisfies Place
