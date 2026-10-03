import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theCompany = {
  id: "01a0ddf8-63fd-7677-aa87-33227c2be418",
  type: "page-type/lore",
  slug: "the-company",
  title: "The Company",
  world: "world/the-beholder",
  about: "world-organization/the-beholder-the-company",
  facts: [
    {
      fact: "The prompt-side wing is the backstage area where Pearl watches the show with her dress kit.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Company performed a multi-act show with a featured solo for its prima.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The house empties within about twenty minutes of the final bow.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "After the show the big stage rig clunks down to the work-lights.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The work-lights are low amber lights that make everything look like it's remembering itself.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Company has a green room, and a mirror studio off it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mirror studio is walled entirely in mirror, and its light is kind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette liked to break down her heavy costumes in the mirror studio after shows, with Pearl's help.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
