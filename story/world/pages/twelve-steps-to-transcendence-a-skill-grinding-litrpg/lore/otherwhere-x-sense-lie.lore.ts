import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXSenseLie = {
  id: "01a0ea7a-2e1b-7c19-92fe-58533d427336",
  type: "page-type/lore",
  slug: "otherwhere-x-sense-lie",
  title: "Sense Lie",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-sense-lie",
  facts: [
    {
      fact: "[Sense Lie] detects falsehoods as they are spoken.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its rarity has not been shown.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Arthur, a House Vane knight and guard, holds it and uses it when questioning people.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
