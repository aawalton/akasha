import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiChristie = {
  id: "01a0ed2d-dbfe-72c6-bcd1-b2cef2c6882b",
  type: "page-type/lore",
  slug: "overwhere-iii-christie",
  title: "Christie",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-christie",
  facts: [
    {
      fact: "Christie is a girl of Sunvale of ten or eleven, with braids, kind and brave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her father is gone, likely killed; her mother works long hours and gathers firewood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her mother wears her hair in a neat bun and is sharp and protective.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "They live in a small, shabby, spotless house; they eat hard bread and little meat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With other children she freed the magpie Liora from Order mages at the Sunvale inn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Among those children were a tall older boy who led them and a small purple-haired boy with magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Now she is in Sunvale with her mother.", knowers: ["lore-disclosure/game-master"] },
  ],
  secrets: "jsonl",
} as const satisfies Lore
