import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const emberdeepFirstLevel = {
  id: "01a0fdf5-b2d7-7c88-a1ed-38fc1ef7e329",
  type: "page-type/place",
  slug: "emberdeep-first-level",
  title: "The First Level",
  world: "world/emberdeep",
  within: "place/emberdeep-deep",
  facts: [
    {
      fact: "The first level is old dry halls and passages of dressed stone, cut by no one anyone knows.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The Long Hall runs from the guild's gate, a pillared hall as long as Coppergate.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The Well Room holds an old stone well whose water is clean and very cold.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The Dry Stair, at the far end of the first level, goes down to the second.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The first level's side passages shift with the seasons, and the guild map marks them uncertain.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The first level's commonest creatures are cave rats as big as cats, and pale crab-like crawlers.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "Cave rats bite and run; crawlers nip, and scatter from bright light.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "Small ember-stones turn up in rubble and cracks on the first level, a handful on a good day.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "The finds market buys a small ember-stone for two pennies.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
    {
      fact: "Elowen's chalk arrows on every fourth pillar of the Long Hall point back to the gate.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-elowen",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-wren",
      ],
    },
    {
      fact: "A side passage near the Well Room, drawn on the right on the guild map, now opens on the left.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-wren",
        "character-other/emberdeep-elowen",
      ],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
