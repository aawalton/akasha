import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiCorruption2 = {
  id: "01a0fdd3-ba66-7b8e-8d01-d5cdf7cfceae",
  type: "page-type/lore",
  slug: "overwhere-iii-corruption-2",
  title: "Corruption, continued",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  facts: [
    {
      fact: "The corrupted fox fights in quick darting bites at the legs, and bolts for its sett when hurt.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The fox's bite lays blight; by day it lies up in its sett, and it raids the coops at night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The bite's dark thread leads straight to the fox's sett; to Nala's sight the fox is a dark smear.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-iii-nala"],
    },
    {
      fact: "A corrupted beast of about Level 5, killed, leaves a small blightstone that three weaves crack.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
