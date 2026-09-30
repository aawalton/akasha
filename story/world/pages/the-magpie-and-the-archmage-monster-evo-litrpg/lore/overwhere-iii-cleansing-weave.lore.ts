import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiCleansingWeave = {
  id: "01a0f218-ee14-7526-aaf5-b4da24c1de19",
  type: "page-type/lore",
  slug: "overwhere-iii-cleansing-weave",
  title: "Cleansing Weave",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "world-skill/overwhere-iii-cleansing-weave",
  facts: [
    {
      fact: "Her first holy thread through blight earns: [New skill acquired – Cleansing Weave.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "[Cleansing Weave – At [Basic] level, draw holy current through blight to unpick it.]",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "Cleansing Weave is not Purify; Purify stays in her skill shop at 15 glimmerstones.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
