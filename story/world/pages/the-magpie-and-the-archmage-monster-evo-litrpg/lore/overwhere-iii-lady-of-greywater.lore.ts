import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiLadyOfGreywater = {
  id: "01a0ed33-882d-73c2-8710-75fef7b6f6c4",
  type: "page-type/lore",
  slug: "overwhere-iii-lady-of-greywater",
  title: "The Lady of Greywater",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-lady-of-greywater",
  facts: [
    {
      fact: "Merrowgate folk call the thing in Greywater Tarn the Lady, and keep away from its shore alone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Two men went down to the tarn alone in living memory; neither came back.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
