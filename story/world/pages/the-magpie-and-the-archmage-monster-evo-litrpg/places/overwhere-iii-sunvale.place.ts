import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIiiSunvale = {
  id: "01a0ed2d-97f5-7266-b753-b6d85cdb9717",
  type: "page-type/place",
  slug: "overwhere-iii-sunvale",
  title: "Sunvale",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  exits: [
    {
      to: "place/overwhere-iii-blightpeak",
      way: "Out across the shriveled fields to the mountain's foot.",
      direction: "east",
    },
    { to: "place/overwhere-iii-satyr-lake", way: "Downriver along the road toward Cyene." },
  ],
  facts: [
    {
      fact: "Sunvale is a small, poor town of old brick and wood buildings in hilly country.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a week and a half's walk from Cyene, and many weeks south of the Wrenmark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The peaks of Blightpeak rise just east of Sunvale.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A little river runs past Sunvale toward Satyr Lake and on toward Cyene.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For forty years blight from Blightpeak withered Sunvale's fields and forests.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gardens of small pears and apples were its only good land; hyenas took the livestock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The blight has eased since its source was cleansed; the land grows livelier now.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An old abandoned watchtower, cracked and dusty, is home to pigeons, bats and spiders.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The town square holds a market every two weeks, with a few travelling merchants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sunvale has one inn, with a bar and a sleepy innkeeper.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dr. Reius, an animal doctor, keeps a barn-like clinic on the far side of town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sunvale has no fighters or mages; its folk stay indoors after dark.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Over forty years ago Sunvale was lush, and adventurers trained on the mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sunvale folk revere a lucky magpie that saved them, and leave out food for it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
