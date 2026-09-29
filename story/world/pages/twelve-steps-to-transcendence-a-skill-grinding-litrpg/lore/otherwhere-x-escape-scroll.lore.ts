import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXEscapeScroll = {
  id: "01a0ea7a-5bd9-7403-b031-7a1d2d1d4af2",
  type: "page-type/lore",
  slug: "otherwhere-x-escape-scroll",
  title: "Escape Scroll",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-item/otherwhere-x-escape-scroll",
  facts: [
    {
      fact: "An escape scroll is used by ripping it, and teleports its user away.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An escape scroll is meant to carry its user to the next town.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Escape scrolls come in tiers, and merchants sell them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Only an extremely high-tier scroll could send someone through a regional wall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Buying such a high-tier scroll from a random merchant would be suspicious.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
