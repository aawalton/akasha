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
    {
      fact: "A holy thread shaped as a pull is Cleansing Weave by another road, and costs its 3 mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pulling blight out whole is quicker than unpicking it: two pulls clear a weeks-old bite.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Blight pulled from living flesh clots at the wound's lip into a blightstone the size of a seed.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/overwhere-iii-nala",
        "character-other/overwhere-iii-brannagh-tull",
      ],
    },
    {
      fact: "Each pull sends a cold ache up the thread into her arm, and costs her 1 health.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A seed-sized blightstone from a bite cracks with one Cleansing Weave into a speck of a glimmerstone.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "To Nala's sight a seed stone is a tight knot of black current, a pinprick of pale light at its core.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
