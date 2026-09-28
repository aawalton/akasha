import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSkillTiers = {
  id: "01a0e9ff-67f5-7648-9e36-3cce3285fe75",
  type: "page-type/lore",
  slug: "otherwhere-v-skill-tiers",
  title: "Skill Tiers",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-skill-tiers",
  facts: [
    {
      fact: "Talents and skills come in tiers: Low-tier, Moderate-tier or Mid-tier, and High-tier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An offer names its tier first, as in High-tier Magic Resistance or Low-tier Focused Mind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A tier prefix stays in the name on the status, as in High-tier Disguise 9.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Higher-tier spells and skills overcome lower-tier resistance more easily.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One skill of middling tier cannot stand against strong fear magic.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Above High-tier, Talents and skills can become Unique, one of a kind to their holder.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Developed skills often drop the tier prefix and bear a new name of their own.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
