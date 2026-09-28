import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiSurvival = {
  id: "01a0ea43-90c3-7b3f-8802-035282a96632",
  type: "page-type/lore",
  slug: "otherwhere-vii-survival",
  title: "Needs",
  world: "world/god-of-trash",
  about: "world-mechanic/otherwhere-vii-survival",
  facts: [
    {
      fact: "In early autumn hedges hold blackberries, hazelnuts and sloes, and fields hold gleanings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Autumn days are mild, nights cold enough to shiver without a blanket, with frost coming.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Farm dogs bark at strangers sleeping in barns, and farmers set them on thieves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Taking a fruit from a hedge is no crime, but taking from a field or a coop is theft.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A mortal needs bread and water daily; a mage of Tier 2 or more needs neither.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
