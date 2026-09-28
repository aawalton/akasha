import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIvIronfields = {
  id: "01a0ea0d-bdb8-7449-808b-2c263ee5426d",
  type: "page-type/place",
  slug: "otherwhere-iv-ironfields",
  title: "The Ironfields",
  world: "world/beware-of-chicken",
  within: "place/otherwhere-iv-azure-hills",
  facts: [
    {
      fact: "The Ironfields is a region where the land itself was turned to metal in an ancient cataclysm.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rusting metal spires called karsts, once stone, crumble across the Ironfields.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ironfields soil is heavily contaminated with copper, iron and lead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Metal-tainted water gives locals vivid hair colours, as they shed metal through their hair.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ironfields folk still lose about a decade of life to heavy-metal buildup.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Iron Town, a Hermetic Iron Sect holding, is paved with beaten brass instead of stone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ironfields wildlife includes irondillos, rust crickets, karst shrikes and ironbore beetles.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A deep Ironfields tunnel holds a cold mercury lake home to silver-furred bats.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mineral sites such as the Jewel Springs and Blue Star Lake are prized for their colours.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hermetic Iron Sect guards the Ironfields.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
