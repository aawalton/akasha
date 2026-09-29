import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaTracing = {
  id: "01a0ea78-8086-73e1-877b-e5cf302318d1",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-tracing",
  title: "Mana Tracing",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-mana-tracing",
  facts: [
    {
      fact: "[Mana Tracing] is a tracking skill that shows glowing footprints.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is one of four evolution paths offered to [Mana Sense] at level 10.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "As an evolution of a Common skill, it would be Uncommon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben passed it over for [Mana Sonar]; no holder of it has been seen.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
