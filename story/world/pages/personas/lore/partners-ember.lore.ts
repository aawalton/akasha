import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersEmber = {
  id: "01a0de54-1c10-7a26-be9a-c5b661ff9bb9",
  type: "page-type/lore",
  slug: "partners-ember",
  title: "Ember",
  world: "world/personas",
  about: "character-other/partners-ember",
  facts: [
    { fact: "Ember is Amberford's smith.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Ember is cat-eared.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Ember fights like a forge: patient, then all at once.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
