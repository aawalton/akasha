import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVOstrenWilds = {
  id: "01a0e9f9-26ec-7b72-8127-08230c981367",
  type: "page-type/place",
  slug: "otherwhere-v-ostren-wilds",
  title: "The Wilds of Ostren",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "The wilds cover about a third of Ostren, a managed wilderness where Questors hunt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The wilds hold dead dungeons and cultivated monsters for rookie Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Villages grow sparser toward the wilds, away from the Blinded Mountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A sinuous forested valley with a river runs through the wilds south of Dawn's Concord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The valley holds ruins of dungeons cleared centuries ago.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
