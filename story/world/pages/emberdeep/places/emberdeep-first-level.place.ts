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
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The Long Hall runs from the guild's gate, a pillared hall as long as Coppergate.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The Well Room holds an old stone well whose water is clean and very cold.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The Dry Stair, at the far end of the first level, goes down to the second.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The first level's side passages shift with the seasons, and the guild map marks them uncertain.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The first level's commonest creatures are cave rats as big as cats, and pale crab-like crawlers.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "Cave rats bite and run; crawlers nip, and scatter from bright light.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "Small ember-stones turn up in rubble and cracks on the first level, a handful on a good day.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "The finds market buys a small ember-stone for two pennies.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
