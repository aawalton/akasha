import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerGalleryAlcove = {
  id: "01a0d440-3aed-7c18-9497-2c0d7a8ccfc2",
  type: "page-type/place",
  slug: "the-tower-gallery-alcove",
  title: "The Dead Alcove",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/game-master",
  within: "place/the-tower-floor-03",
  depth: 3,
  description:
    "A side recess off the nave, its walls hung with rotted acoustic baffling — felt and horsehair, centuries old. Inside it, sound DIES. The hum cuts to nothing the moment you step in. A reader who notices the silence understands the whole floor.",
  exits: [{ to: "place/the-tower-gallery-nave", way: "back into the nave only" }],
  facts: [
    "Sound dies inside the Dead Alcove.",
    "The Dead Alcove's amber light is dimmer than the nave's.",
    "The Dead Alcove holds no water.",
  ],
} as const satisfies Place
