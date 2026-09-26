import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerGalleryAlcove = {
  id: "01a0d440-3aed-7c18-9497-2c0d7a8ccfc2",
  type: "page-type/place",
  slug: "the-tower-gallery-alcove",
  title: "The Dead Alcove",
  world: "world/personas",
  within: "place/the-tower-floor-03",
  depth: 3,
  description:
    "A side recess off the nave, its walls hung with rotted acoustic baffling — felt and horsehair, centuries old. Inside it, sound dies: even the nave's faint echoes fall to nothing the moment one steps in.",
  exits: [{ to: "place/the-tower-gallery-nave", way: "back into the nave only" }],
  facts: [
    { fact: "Sound dies inside the Dead Alcove.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "The Dead Alcove is unlit, dark as the rest of the gallery.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "The Dead Alcove holds no water.", knowers: ["lore-disclosure/game-master"] },
  ],
} as const satisfies Place
