import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVTime = {
  id: "01a0ea0d-0fa3-70cf-90fd-e4e55594d25f",
  type: "page-type/lore",
  slug: "otherwhere-v-time",
  title: "Time",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-time",
  facts: [
    {
      fact: "Nala's days are counted from the evening she landed in Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
