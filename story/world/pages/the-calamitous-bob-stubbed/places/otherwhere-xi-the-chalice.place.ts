import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiTheChalice = {
  id: "01a0ea84-fb2a-78b4-8278-3bff0b883131",
  type: "page-type/place",
  slug: "otherwhere-xi-the-chalice",
  title: "The Chalice",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-helock",
  facts: [
    {
      fact: "The Chalice was the largest of Helock's floating islands, shaped like a cup.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Chalice floated about two hundred meters above Helock's government district and Academy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Chalice was a magical object of great power, held aloft by manatite.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "On the Chalice mana storms disabled enchantments and gales smashed beasts and carts.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Most of the Chalice was never explored.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The redeemed lich Abenezigel once lived hidden on the Chalice, studying its stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Chalice vanished from Helock's sky about seven years ago, leaving a bucket as a calling card.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For the Chalice's loss the Alliance fined Harrak a hundred gold talents.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After the Chalice vanished Harrak lost Helock's portal network for three months.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Helock's astrology club, the Floating Stones Society, watched the Chalice with a recording golem.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
