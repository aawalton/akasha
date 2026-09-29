import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXHoldingBag = {
  id: "01a0ea7a-5bd9-77c6-ab36-9d61273cce14",
  type: "page-type/lore",
  slug: "otherwhere-x-holding-bag",
  title: "Holding Bag",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-holding-bag",
  facts: [
    {
      fact: "A holding bag is a magic pouch that stores far more than its size, even ponds of water.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A holding bag opens only when fed mana, not by pulling its strings.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its holder senses the contents mentally; one bag's inside was roughly bed-sized and tall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Items and liquids are pulled out or poured by will, without spilling.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A pouch-sized holding bag can hold hundreds of essence shards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Noble children carry holding bags; a House's bag counts as House property.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Army officers can own holding bags too.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A noble party's bag held rift water, a staff, chain mail, waterskins, gold and food.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
