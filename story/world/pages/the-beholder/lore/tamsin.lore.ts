import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const tamsin = {
  id: "01a0ddf8-63fd-7e25-94a7-4aa80fe8a349",
  type: "page-type/lore",
  slug: "tamsin",
  title: "Tamsin",
  world: "world/the-beholder",
  loreDisclosure: "lore-disclosure/wiki",
  facts: [
    "Tamsin is a new corps dancer, eighteen, in her first season with the company.",
    "Tamsin is terrified.",
    "After the show Tamsin cried very quietly backstage, certain no one could see.",
    "Forty people were backstage while Tamsin cried, and nobody saw.",
    "Colette Vane crossed the backstage and took Tamsin's face in both hands to reassure her.",
    "Colette privately told Tamsin her missed entrance came from a cue light dead since intermission.",
    "Colette told Tamsin it wasn't her fault, which unlocked Tamsin's distress.",
    "Tamsin witnessed Colette's gift but took no part in Colette's killing.",
    "Tamsin is alive.",
  ],
} as const satisfies Lore
