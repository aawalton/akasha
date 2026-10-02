import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiCurrentFeed = {
  id: "01a0fe8a-9b8d-71b5-86be-8cbb4b35367c",
  type: "page-type/lore",
  slug: "overwhere-iii-current-feed",
  title: "Current Feed",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "world-skill/overwhere-iii-current-feed",
  facts: [
    {
      fact: "Her first holy weave fed cleanly from white-gold alone earns: [New skill acquired – Current Feed.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "[Current Feed – At [Basic] level, feed a holy weave from white-gold current, not your own well.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A fed weave reads own 0 and spends none of her mana; the raw current's burn costs her 1 health.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
