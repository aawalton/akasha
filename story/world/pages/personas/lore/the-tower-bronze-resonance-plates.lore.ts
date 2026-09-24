import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerBronzeResonancePlates = {
  id: "01a0d443-c6a2-78c5-9f48-2af0181b9ca6",
  type: "page-type/lore",
  slug: "the-tower-bronze-resonance-plates",
  title: "The Bronze Resonance-Plates",
  world: "world/personas",
  about: "item/the-tower-bronze-resonance-plates",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Resonant Nave's bronze plates amplify every sound.",
    "The Hollow Cantor's power runs through the Resonant Nave's bronze plates.",
  ],
} as const satisfies Lore
