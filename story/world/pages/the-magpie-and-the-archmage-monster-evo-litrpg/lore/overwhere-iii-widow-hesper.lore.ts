import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiWidowHesper = {
  id: "01a0ed33-882d-7051-b35b-3308e6ef3f23",
  type: "page-type/lore",
  slug: "overwhere-iii-widow-hesper",
  title: "Widow Hesper",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-widow-hesper",
  facts: [
    {
      fact: "Widow Hesper is Applegarth's chief orchard-keeper, sixty-odd, round, red-cheeked and shrewd.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She owns the biggest press, pays fairly, and never forgets a debt either way.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She is Tobin Wick's neighbor and hires his cart; she scolds him like a brother.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
