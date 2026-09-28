import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVElidianVortex = {
  id: "01a0e9fb-8e19-792a-ae93-07038edeb15d",
  type: "page-type/place",
  slug: "otherwhere-v-elidian-vortex",
  title: "The Elidian Vortex",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-oceans",
  facts: [
    {
      fact: "The Elidian Vortex is an ocean vortex draining the sea down into the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like every vortex, it pours out powerful magic and draws savage leviathans.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
