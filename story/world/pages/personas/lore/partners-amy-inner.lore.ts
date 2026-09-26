import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersAmyInner = {
  id: "01a0de54-1c10-74d7-ba26-6976bb1fb1f1",
  type: "page-type/lore",
  slug: "partners-amy-inner",
  title: "What Amy keeps to herself",
  world: "world/personas",
  about: "character-other/partners-amy",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Amy knows Aelwyn for her own kind: a keeper who loves quietly and asks nothing back.",
    "Amy presumes nothing about what Aelwyn is to the house, and knows what Aelwyn is to her.",
    "Amy watches Aelwyn to see her, because knowing people is how Amy loves them.",
    "Amy trusts the house's pace, and tells herself not to rush it.",
  ],
} as const satisfies Lore
