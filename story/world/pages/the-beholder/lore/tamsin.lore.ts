import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const tamsin = {
  id: "01a0ddf8-63fd-7e25-94a7-4aa80fe8a349",
  type: "page-type/lore",
  slug: "tamsin",
  title: "Tamsin",
  world: "world/the-beholder",
  about: "character-other/the-beholder-tamsin",
  facts: [
    {
      fact: "Tamsin is a new corps dancer, eighteen, in her first season with the company.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Tamsin is terrified.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "After the show Tamsin cried very quietly backstage, certain no one could see.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Forty people were backstage while Tamsin cried, and nobody saw.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette Vane crossed the backstage and took Tamsin's face in both hands to reassure her.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette privately told Tamsin her missed entrance came from a cue light dead since intermission.",
      knowers: ["lore-disclosure/game-master", "character-other/the-beholder-tamsin"],
    },
    {
      fact: "Colette told Tamsin it wasn't her fault, which unlocked Tamsin's distress.",
      knowers: ["lore-disclosure/game-master", "character-other/the-beholder-tamsin"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
