import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLanguageLearning = {
  id: "01a0ea0d-0fa2-7ef5-afb3-f22a4b215367",
  type: "page-type/lore",
  slug: "otherwhere-v-language-learning",
  title: "Language Learning",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-language-learning",
  facts: [
    {
      fact: "A tongue is learned by hearing it and using it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
