import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const emberdeepFennick = {
  id: "01a0fe85-d750-7c5c-88d8-51a3393cc00e",
  type: "page-type/place",
  slug: "emberdeep-fennick",
  title: "Fennick",
  world: "world/emberdeep",
  facts: [
    {
      fact: "Fennick is a hill village of sheep farms and one water mill, three days' walk down the valley.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fennick's reeve is Tam Orley, an old shepherd who writes a looping hand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Nala of Fennick grew up in the mill cottage with her mother, a weaver, and no father.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one from Fennick is in Emberdeep, and few people up here have heard of it.",
      knowers: ["lore-disclosure/game-master", "character-other/emberdeep-wren"],
    },
    {
      fact: "Hardly anyone in Emberdeep could say where Fennick is.",
      knowers: [
        "lore-disclosure/game-master",
        "character-other/emberdeep-wren",
        "character-player/emberdeep-nala",
        "character-other/emberdeep-elowen",
      ],
    },
  ],
} as const satisfies Place
