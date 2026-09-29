import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvTrixie = {
  id: "01a0ed28-60b7-7a17-a969-4d4257763fab",
  type: "page-type/lore",
  slug: "overwhere-iv-trixie",
  title: "Trixie",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Trixie is a pixie mage, small, winged and full of mischief.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trixie lived with Syl on the floating island Glimmerock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trixie taught Syl much of her magic, including how skills can be uncapped.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trixie makes branch sprites out of plants with nature magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Trixie is a teaser and a troublemaker, and her teasing shaped Vee's own manner.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Trixie called Syl an old soul.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Trixie judged Syl's living hat harmless, and says it is safe and growing.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Trixie may serve the Fairy Queen.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Trixie once planned to meet Syl in the Dwarven Empire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Where Trixie is now, no one of Syl's circle knows.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
