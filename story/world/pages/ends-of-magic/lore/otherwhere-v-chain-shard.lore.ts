import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVChainShard = {
  id: "01a0e9ff-2b3c-789f-b521-d2e45d9c5809",
  type: "page-type/lore",
  slug: "otherwhere-v-chain-shard",
  title: "Chain Shard",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-chain-shard",
  facts: [
    {
      fact: "Floating chain shards fill a dungeon forest of metal spires on the continent of Esebus.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
