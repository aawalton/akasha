import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const emberdeepCorbelHouse = {
  id: "01a0fdc6-e790-720d-8514-3033f5d0b8d3",
  type: "page-type/place",
  slug: "emberdeep-corbel-house",
  title: "Corbel House",
  world: "world/emberdeep",
  within: "place/emberdeep-town",
  facts: [
    {
      fact: "Corbel House is a narrow rooming house of grey stone, four storeys high, halfway up Ladder Lane.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "Corbel House is kept by a stout old widow who serves porridge at seven and takes rent on Restday.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "Corbel House's top landing has two rooms, 7 and 8, facing each other, and a small shared washroom.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "Room 7 is narrow: a bed, a washstand, a chest, a row of pegs and a window over the rooftops.",
      knowers: ["lore-disclosure/game-master", "character-player/emberdeep-nala"],
    },
    {
      fact: "Hot water at Corbel House is carried up in cans from the ember-stove in the kitchen.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
      ],
    },
    {
      fact: "Room 7 at Corbel House is paid to the end of the week.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-wren",
      ],
    },
  ],
} as const satisfies Place
