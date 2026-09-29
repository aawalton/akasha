import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiCalFenn = {
  id: "01a0ed32-5181-722d-a457-a2963dd64e40",
  type: "page-type/lore",
  slug: "overwhere-iii-cal-fenn",
  title: "Cal Fenn",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-cal-fenn",
  facts: [
    {
      fact: "Cal Fenn is Jory's elder brother, twenty-three, a hunter, broad and laughing, well liked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He went into the deep Wrenwood at midwinter after a blighted stag and did not come home.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
