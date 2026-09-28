import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSeminaryOfAssassins = {
  id: "01a0e9fc-7097-7834-84d2-12b4f0f08db4",
  type: "page-type/lore",
  slug: "otherwhere-v-seminary-of-assassins",
  title: "The Seminary of Assassins",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-seminary-of-assassins",
  facts: [
    {
      fact: "The Seminary of Assassins was founded and is led by Amoh, a Questor of Badud's grid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Amoh's gridmate Ogarius runs separate assassin cells of his own.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
