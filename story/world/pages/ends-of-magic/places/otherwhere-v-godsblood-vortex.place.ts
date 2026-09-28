import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVGodsbloodVortex = {
  id: "01a0e9fb-8e1a-7ff8-bd5f-2cea47e30c0a",
  type: "page-type/place",
  slug: "otherwhere-v-godsblood-vortex",
  title: "The Godsblood Vortex",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-oceans",
  facts: [
    {
      fact: "The Godsblood Vortex is an ocean vortex draining the sea down into the underworld.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Like every vortex, it pours out powerful magic and draws savage leviathans.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
