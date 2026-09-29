import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXPapers = {
  id: "01a0eaa4-37ee-798e-b0a4-d848746aec2d",
  type: "page-type/lore",
  slug: "otherwhere-x-papers",
  title: "Papers and Suspicion",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-papers",
  facts: [
    {
      fact: "A road token, asked of travellers, is a reeve's letter or a stamped tally.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-x-nala"],
    },
  ],
} as const satisfies Lore
