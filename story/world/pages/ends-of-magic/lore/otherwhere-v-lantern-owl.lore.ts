import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLanternOwl = {
  id: "01a0ea06-e83e-7c2b-8320-944d9687b6ee",
  type: "page-type/lore",
  slug: "otherwhere-v-lantern-owl",
  title: "Lantern-owl",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-lantern-owl",
  facts: [
    {
      fact: "A lantern-owl is small and brown, with pale disc eyes that shine back any light.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At dusk a lantern-owl whistles three rising notes, and its mate answers the same.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lantern-owls eat lamp-moths, mice and click-lizards, and are harmless to people.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lantern-owls stop calling when a gloamcat moves beneath their tree.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Valley folk say a wood where the lantern-owls have gone quiet is a wood to leave.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
