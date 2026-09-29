import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXEssenceShard = {
  id: "01a0ea77-7cd1-7035-964d-9f184c244a92",
  type: "page-type/lore",
  slug: "otherwhere-x-essence-shard",
  title: "Essence Shard",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-essence-shard",
  facts: [
    {
      fact: "Essence shards are faintly glowing blue crystals holding essence.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Shards dissolved in hot water turn it swirling blue with star-like flakes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Tier 0 soaking in shard water absorbs the essence far easier than from bare shards.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Absorbing shards one by one without a medium would take a Tier 0 about a week.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Drained shards leave the water a dull murky gray.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Hundreds of shards can be carried in a holding-bag pouch.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Army officers may keep shards to advance a promising Tier 0 to Tier 1.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rifts can hold essence shards among their treasures.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
