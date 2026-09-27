import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dragonsAndDungeonsTheRuinedShrine = {
  id: "01a0e396-9d95-74c0-bc74-5efbecdbe57b",
  type: "page-type/place",
  slug: "dragons-and-dungeons-the-ruined-shrine",
  title: "The Ruined Shrine",
  world: "world/personas",
  exits: [
    { way: "Up the rubble slope in one corner and out through the broken ceiling." },
    { way: "Down the narrow servants' passage behind the altar, into the dark." },
  ],
  facts: [
    {
      fact: "The shrine is small and ruined, half-swallowed by forest, its stone walls weeping.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
      ],
    },
    {
      fact: "One corner of the roof has fallen into a rubble slope up to the broken ceiling.",
      knowers: ["lore-disclosure/game-master", "character-player/dragons-and-dungeons-alan"],
    },
    {
      fact: "The shrine's old nave has a row of shattered windows that let the moonlight in.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
      ],
    },
    {
      fact: "A ringbolt sunk in the nave floor held Tygryth's chain.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
      ],
    },
    {
      fact: "Tygryth's black iron collar and chain lie open on the nave floor.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
      ],
    },
    {
      fact: "A low stone altar sits against the nave's side wall, under a fallen tapestry.",
      knowers: ["lore-disclosure/game-master", "character-player/dragons-and-dungeons-alan"],
    },
    {
      fact: "A narrow servants' passage behind the altar descends into the dark, cool air rising.",
      knowers: ["lore-disclosure/game-master", "character-player/dragons-and-dungeons-alan"],
    },
    {
      fact: "Three dark towers of the chain-makers are within horn-call of the shrine.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
      ],
    },
    {
      fact: "A storm-wall of black cloud is east of the shrine.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
      ],
    },
  ],
} as const satisfies Place
