import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const fairweatherHobbMill = {
  id: "01a1128c-6ada-74c4-a19c-2bed37963a38",
  type: "page-type/place",
  slug: "fairweather-hobb-mill",
  title: "Hobb Mill",
  cover: "image/image-57a6e457bf623ab7",
  world: "world/fairweather",
  facts: [
    {
      fact: "Hobb Mill is a tall stone watermill on the Wend, two hours south of Lanternmere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A great wooden wheel turns beside the mill, and a thatched cottage and a weeping willow sit by it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hobb Mill grinds flour for half the bakers in Lanternmere, the Honeycomb among them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The miller is Bess Hobb, a stout widow who runs the mill with her two grown daughters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A boggart is a knee-high, hairy house-spirit that turns spiteful when it is slighted.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-noor",
      ],
    },
    {
      fact: "For a month the Hobb Mill boggart has jammed the wheel with weed and stones every night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The boggart turned spiteful when Bess stopped leaving it a bowl of cream after her mother died.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A boggart given cream and thanks again goes back to helping the house it lives in.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A boggart bites hard, throws stones, and slips into the dark between one blink and the next.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/fairweather-cora",
        "character-other/fairweather-noor",
      ],
    },
  ],
} as const satisfies Place
