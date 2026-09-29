import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveDeclared = {
  id: "01a0ea36-9985-7a84-868f-e795e7c03249",
  type: "page-type/lore",
  slug: "super-supportive-declared",
  title: "Declared",
  world: "world/super-supportive",
  about: "world-title/super-supportive-declared",
  facts: [
    {
      fact: "Declared is the title of one who has chosen to become a knight but not yet had a first affixation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Outsiders seeking knighthood are pruned repeatedly; serious ones are invited to serve as votaries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "All declared are admitted to DawnStep; outsider and Rapport declared are housed and trained apart.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
