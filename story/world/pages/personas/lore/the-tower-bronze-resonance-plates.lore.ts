import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerBronzeResonancePlates = {
  id: "01a0d443-c6a2-78c5-9f48-2af0181b9ca6",
  type: "page-type/lore",
  slug: "the-tower-bronze-resonance-plates",
  title: "The Bronze Resonance-Plates",
  world: "world/personas",
  about: "story-item/the-tower-bronze-resonance-plates",
  facts: [
    {
      fact: "The Resonant Nave's bronze plates amplify every sound.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
