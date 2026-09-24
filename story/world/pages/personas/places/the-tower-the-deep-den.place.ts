import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerTheDeepDen = {
  id: "01a0d441-09f7-7222-80b4-5b60162817d7",
  type: "page-type/place",
  slug: "the-tower-the-deep-den",
  title: "The Deep Den",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-05",
  depth: 5,
  description:
    "A low, wet, cold stone chamber reeking of old bone, sloping down toward the Host's Seat — the real room the haven was painted over. Its floor is a midden of what the haven ate: packs, boots and bones, a long time's worth of climbers who sat down to rest.",
  exits: [
    { to: "place/the-tower-the-long-gallery", way: "back to the Long Gallery" },
    { to: "place/the-tower-the-hosts-seat", way: "forward / down-slope to the Host's Seat" },
  ],
  facts: ["The Deep Den is the Host's cold stone predation-chamber, bare of any glamour."],
} as const satisfies Place
