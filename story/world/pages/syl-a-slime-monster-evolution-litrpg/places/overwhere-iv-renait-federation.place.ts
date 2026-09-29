import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIvRenaitFederation = {
  id: "01a0ed2e-794c-7f88-be0a-7c086de1084a",
  type: "page-type/place",
  slug: "overwhere-iv-renait-federation",
  title: "Renait Federation",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "The Renait Federation is a human country whose seat is known only as The Capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Capital lies far to the east of Kaerlin and Southbrook.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Capital is a great city of noble houses, guild halls and old enchantments.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Capital's teleport-sensing net is the model that others copy.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Adventurers traveling toward The Capital pass the site of a guild dungeon test.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
