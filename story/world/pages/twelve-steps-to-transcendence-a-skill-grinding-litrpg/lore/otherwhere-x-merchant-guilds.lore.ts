import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXMerchantGuilds = {
  id: "01a0ea78-4905-7db2-a5ef-f8a38ed27b45",
  type: "page-type/lore",
  slug: "otherwhere-x-merchant-guilds",
  title: "Merchant Guilds",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-organization/otherwhere-x-merchant-guilds",
  facts: [
    {
      fact: "Merchant guilds operate in Sulon's capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merchant guilds contend with rival factions in the capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A rival faction can wipe out even a massive merchant guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A great guild can be the seat of a noble house.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merchants sell magic goods such as escape scrolls, some of doubtful quality.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In the Western Plains, House Sterling runs a bustling trading hub.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
