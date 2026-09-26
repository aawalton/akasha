import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersEmber = {
  id: "01a0de54-1c10-7a26-be9a-c5b661ff9bb9",
  type: "page-type/lore",
  slug: "partners-ember",
  title: "Ember",
  world: "world/personas",
  about: "character-other/partners-ember",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "Ember is Amberford's smith.",
    "Ember is cat-eared.",
    "Ember fights like a forge: patient, then all at once.",
  ],
} as const satisfies Lore
