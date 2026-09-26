import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberWave = {
  id: "01a0de1f-035c-7448-a7bc-3f69e31201ac",
  type: "page-type/lore",
  slug: "the-tower-ember-wave",
  title: "Ember Wave",
  world: "world/personas",
  about: "tower-skill/the-tower-alan-ember-wave",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Ember Wave projects channeled Ember outward through a conduit as a wave or gout of flame.",
    "Ember Wave costs a great deal of focus.",
    "Through a charged, infused weapon the wave is stronger and cheaper, spending the bound charge.",
  ],
} as const satisfies Lore
