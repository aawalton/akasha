import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGargoyle = {
  id: "01a0e9ff-2b3d-7265-82a2-8419e8e2a2b4",
  type: "page-type/lore",
  slug: "otherwhere-v-gargoyle",
  title: "Gargoyle",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-gargoyle",
  facts: [
    {
      fact: "Stone gargoyles with long limbs man squat dungeon buildings on the continent of Esebus.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
