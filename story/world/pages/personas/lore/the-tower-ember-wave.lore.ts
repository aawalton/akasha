import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerEmberWave = {
  id: "01a0de1f-035c-7448-a7bc-3f69e31201ac",
  type: "page-type/lore",
  slug: "the-tower-ember-wave",
  title: "Ember Wave",
  world: "world/personas",
  about: "world-skill/the-tower-ember-wave",
  facts: [
    {
      fact: "Ember Wave projects channeled Ember outward through a conduit as a wave or gout of flame.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Ember Wave costs a great deal of focus.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "Through a charged, infused weapon the wave is stronger and cheaper, spending the bound charge.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
