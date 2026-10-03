import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const superSupportiveSkiff = {
  id: "01a0e9f2-0ab0-7b79-b0fe-e23bc9330269",
  type: "page-type/lore",
  slug: "super-supportive-skiff",
  title: "Skiff",
  world: "world/super-supportive",
  about: "character-other/super-supportive-skiff",
  facts: [
    {
      fact: "The villain he drowned ended up in intensive care, and Skiff looked strained on TV.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-iii-nala"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
