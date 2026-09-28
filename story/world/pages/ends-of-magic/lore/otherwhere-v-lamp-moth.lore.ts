import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVLampMoth = {
  id: "01a0ea06-e83e-72fe-be42-d9325d5c4a72",
  type: "page-type/lore",
  slug: "otherwhere-v-lamp-moth",
  title: "Lamp-moth",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-lamp-moth",
  facts: [
    {
      fact: "A lamp-moth is palm-sized, with pale papery wings and a body that glows soft green.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lamp-moths rise at dusk and drift under the Greyscale Wood's canopy through the night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lamp-moths feed on glowfern pollen, and the pollen they brush off glows briefly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lamp-moths are harmless and do not bite; lantern-owls eat them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A jar of lamp-moths gives light to see a hand by, but their glow dies within a day of capture.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Lamp-moths gather thickest where glowfern grows thickest, as at Fern Hollow.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
