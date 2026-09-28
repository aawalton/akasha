import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVHydraEel = {
  id: "01a0e9fa-9425-7680-b155-4315af64218f",
  type: "page-type/lore",
  slug: "otherwhere-v-hydra-eel",
  title: "Hydra Eel",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-hydra-eel",
  facts: [
    {
      fact: "Hydra eels are sea monsters hard enough to kill that a victory over one is remembered.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
