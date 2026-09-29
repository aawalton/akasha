import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXManaPerception = {
  id: "01a0ea78-8086-7861-ad9e-630c6044f766",
  type: "page-type/lore",
  slug: "otherwhere-x-mana-perception",
  title: "Mana Perception",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-skill/otherwhere-x-mana-perception",
  facts: [
    {
      fact: "[Mana Perception] widens passive awareness of mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It also eases controlling mana outside the body.",
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
