import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dragonsAndDungeonsTheStillwater = {
  id: "01a0e396-9d95-7eab-aab8-09277204ff00",
  type: "page-type/place",
  slug: "dragons-and-dungeons-the-stillwater",
  title: "The Stillwater",
  world: "world/personas",
  exits: [
    {
      to: "place/dragons-and-dungeons-the-crossing",
      way: "Back across the wide water on the slavers' barge, lashed at the quay.",
    },
    {
      to: "place/dragons-and-dungeons-the-drowned-hall",
      way: "Up the broken stair off the far end of the quay.",
    },
  ],
  facts: [
    {
      fact: "The Stillwater is an old drowned sanctuary, half-sunk, on the far shore.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The chain-makers took the Stillwater for their own years back.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "A half-drowned stone quay with pilings is the Stillwater's landing.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "An alarm plate and an iron bar hang on a chain by the quay's brazier.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The slavers' barge is lashed at the quay, its cold blue lantern burning.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "The closed-eye sigil is carved on every surface of the Stillwater the water left.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
        "character-other/dragons-and-dungeons-mari",
      ],
    },
    {
      fact: "No keeper of the Stillwater is left alive.",
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
