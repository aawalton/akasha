import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const partnersIiEmber = {
  id: "01a0de51-2d5f-73c0-8f4c-10306bdd8221",
  type: "page-type/lore",
  slug: "partners-ii-ember",
  title: "Ember",
  world: "world/personas",
  about: "character-other/partners-ii-ember",
  facts: [
    { fact: "Ember is Amberford's smith.", knowers: ["lore-disclosure/game-master"] },
    { fact: "Ember is cat-eared.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "Ember fights like a forge: patient, then all at once.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
