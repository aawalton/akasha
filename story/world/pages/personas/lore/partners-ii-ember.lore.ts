import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiEmber = {
  id: "01a0de51-2d5f-73c0-8f4c-10306bdd8221",
  type: "page-type/lore",
  slug: "partners-ii-ember",
  title: "Ember",
  world: "world/personas",
  about: "character-other/partners-ii-ember",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Ember is Amberford's smith.",
    "Ember is cat-eared.",
    "Ember fights like a forge: patient, then all at once.",
  ],
} as const satisfies Lore
