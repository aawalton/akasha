import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxElasarAuctionChamber = {
  id: "01a0ea41-5400-7eef-8121-1182eb2de236",
  type: "page-type/place",
  slug: "otherwhere-ix-elasar-auction-chamber",
  title: "Elasar's Auction Chamber",
  world: "world/mana-devourer-litrpgmana-cultivation",
  within: "place/otherwhere-ix-arena-depths",
  facts: [
    {
      fact: "Elasar's auction chamber is a huge, partly dug-out cavern deep beneath the arena.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The demon Elasar holds private auctions there for Sun City's elite.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its torches dim at Elasar's word; music plays and food and wine are served.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A podium that vanishes on command and seating for a small crowd face a massive iron gate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The iron gate opens by magic to loose Elasar's newly made monsters for bidders to see.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Bids for one of Elasar's creatures began at a hundred thousand gold and passed five hundred.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Another room near the chamber is reached only by Elasar's flame teleport.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
