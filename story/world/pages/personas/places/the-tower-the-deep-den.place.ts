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
    "The gold thins. This room is colder, the welcome threadbare — the illusion working harder over something it can barely cover. There are figures here too, and now they throw shadows AND reflections, and the air is warm where they stand. Every single tell you climbed to is being faked at once. Under the fraying gold you catch the real room beneath: bare wet stone, a midden of what the haven has eaten — packs, boots, bones, a long time's worth of climbers who sat down to rest.",
  exits: [
    { to: "place/the-tower-the-long-gallery", way: "back to the Long Gallery" },
    { to: "place/the-tower-the-hosts-seat", way: "forward / down-slope to the Host's Seat" },
  ],
  facts: [
    "The Deep Den's gold light is failing over real cold dark.",
    "The Deep Den is a cold stone predation-chamber the False Haven is painted over.",
  ],
} as const satisfies Place
