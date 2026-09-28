import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereIxInventory = {
  id: "01a0ea43-e440-7283-a279-6ad90c0faf83",
  type: "page-type/lore",
  slug: "otherwhere-ix-inventory",
  title: "Inventory",
  world: "world/mana-devourer-litrpgmana-cultivation",
  about: "world-mechanic/otherwhere-ix-inventory",
  facts: [
    {
      fact: "A Firrelian system gives no inventory by default; goods must be carried by hand.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A god's Champion can buy Inventory I from the Faith store for 3 Faith points.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"[Inventory I: An inventory space capable of storing up to 24 squares of objects.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"Small objects take up 1 square, medium objects 2, and large objects take up 4 squares.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"Identical small objects can be stacked on a square up to 50 times,',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"medium objects can be stacked 5 times, and large objects can only be stacked twice.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '…"Cost: 3 Faith points.]"',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Buying it brings a notice that an [Inventory] is unlocked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An inventory upgrade for 6 Faith points doubles its storage.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Quest rewards can be sent straight into an inventory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A large haul, such as a whole kraken tentacle, fits in an inventory.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some beings have an [Inventory] of their own kind, such as one of portals.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
