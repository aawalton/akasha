import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const haremHotelSetThePace = {
  id: "01a0de54-1a0a-7092-9e42-fa89afc0d7c8",
  type: "page-type/lore",
  slug: "harem-hotel-set-the-pace",
  title: "Set the Pace",
  world: "world/personas",
  about: "world-skill/harem-hotel-set-the-pace",
  loreDisclosure: "lore-disclosure/player",
  facts: [
    "Set the Pace controls the tempo of an exchange.",
    "It slows a rushed moment, holds a beat, or quickens a stall.",
    "In a fight it can hold back or move up the turns of allies who follow Aria's lead.",
    "Set the Pace is driven by presence.",
  ],
} as const satisfies Lore
