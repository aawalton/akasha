import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSurvival = {
  id: "01a0ea0d-4e6e-7b10-9e89-0d25796911cc",
  type: "page-type/lore",
  slug: "otherwhere-v-survival",
  title: "Survival",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-survival",
  facts: [
    {
      fact: "Thirst, hunger, cold and want of sleep wear a body down.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-28T22:05:35.726Z",
  updatedAt: "2026-09-28T22:05:39.000Z",
} as const satisfies Lore
