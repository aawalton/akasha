import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAssassinsOfGemore = {
  id: "01a0e9f5-e1ae-7cf6-be35-4c2ef2eefd40",
  type: "page-type/lore",
  slug: "otherwhere-v-assassins-of-gemore",
  title: "The Assassins of Gemore",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-assassins-of-gemore",
  facts: [
    {
      fact: "The Assassins of Gemore keep an assassin tradition handed down from the city's escaped slaves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore's assassins work alongside its adventurers against the city's enemies.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
