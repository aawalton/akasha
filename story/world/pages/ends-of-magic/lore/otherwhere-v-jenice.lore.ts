import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVJenice = {
  id: "01a0e9fc-9998-7ff7-bdfb-7a0660d09a7e",
  type: "page-type/lore",
  slug: "otherwhere-v-jenice",
  title: "Jenice",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-jenice",
  facts: [
    {
      fact: "Jenice is a mortal of Dawn's Concord on Ostren, whose family runs the Golden Respite inn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Golden Respite is a palatial inn near the Arena of the Concord that fawns on Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Her father knows the Questor Colborn, a longtime patron of the inn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Jenice lives and works at her family's inn.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
