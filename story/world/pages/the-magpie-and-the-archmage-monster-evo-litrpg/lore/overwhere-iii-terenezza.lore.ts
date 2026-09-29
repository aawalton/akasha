import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIiiTerenezza = {
  id: "01a0ed33-8989-79ba-8959-3c50ec60f76d",
  type: "page-type/lore",
  slug: "overwhere-iii-terenezza",
  title: "Terenezza",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  about: "character-other/overwhere-iii-terenezza",
  facts: [
    {
      fact: "Terenezza is a human healer, stern of manner, with a long grey braid and white robes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "She serves Sallie, the Pillar of Vital Chalice, as a lead healer.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
