import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const dragonsAndDungeonsTheKinFireRing = {
  id: "01a0e396-9d95-711b-b64e-403bfb4c4260",
  type: "page-type/place",
  slug: "dragons-and-dungeons-the-kin-fire-ring",
  title: "The Kin-Fire Ring",
  world: "world/personas",
  exits: [
    {
      to: "place/dragons-and-dungeons-the-crossing",
      way: "South on foot, down out of the high cold country into greener, wetter land.",
    },
  ],
  facts: [
    {
      fact: "A great dark valley lies past the storm-wall, a silver river winding through it.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "The valley floor is soft moss that swallows footsteps.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "In a clearing is a ring of old, leaning standing stones carved with pictures.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "The carvings show a great dragon, three young, and men with chains driving them apart.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "Saelith carved the ring's stones from memory, as a map home for her line.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "The kin-fire burned in a lantern on a tall iron pole beside the ring.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
    {
      fact: "No insects or wind stir in the ring's bowl of the valley.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
      ],
    },
    {
      fact: "Two chain-makers Alan killed lie dead at the ring.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/dragons-and-dungeons-alan",
        "character-other/dragons-and-dungeons-tygryth",
        "character-other/dragons-and-dungeons-wren",
      ],
    },
  ],
} as const satisfies Place
