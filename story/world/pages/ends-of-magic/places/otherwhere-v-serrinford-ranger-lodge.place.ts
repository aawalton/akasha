import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVSerrinfordRangerLodge = {
  id: "01a0e9ff-1527-7629-8a06-bcab158eb8cf",
  type: "page-type/place",
  slug: "otherwhere-v-serrinford-ranger-lodge",
  title: "Serrinford Ranger Lodge",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-serrinford",
  exits: [
    {
      to: "place/otherwhere-v-serrinford",
      way: "Out the lodge yard gate into the lane beside the Wood Gate.",
    },
  ],
  facts: [
    {
      fact: "The ranger lodge is a two-storey log hall inside its own fence, just within the Wood Gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A green cloth banner with a white antler sign hangs over the lodge yard gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lodge has bunks for twelve rangers; six rangers hold it now, two of them wounded.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lodge yard has straw archery butts, a woodpile, and a kennel for two grey hounds.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The warden's upper room holds a table with a map of the upper vale carved into its top.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A board by the lodge gate is carved with a call for helpers, in Elothian letters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lodge pays helpers ten tesk a day and board, to carry, cook, mind fires and keep watch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The rangers mean to march on Thornmouth again on day twelve, with helpers or without.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The lodge smells of oiled leather, dog, smoke and boiled barley.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
