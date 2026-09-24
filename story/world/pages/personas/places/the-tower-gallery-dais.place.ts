import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerGalleryDais = {
  id: "01a0d440-58f7-75c8-9cfd-f477aa6f2cae",
  type: "page-type/place",
  slug: "the-tower-gallery-dais",
  title: "The Warden's Dais",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-03",
  depth: 3,
  description:
    "The raised platform at the gallery's end, before the archway up. The seat the Plinth Golem kept here is empty; the Golem lies dead down the hall.",
  exits: [
    { to: "place/the-tower-shaft-base-flights", way: "the open arch ahead" },
    { to: "place/the-tower-gallery-nave", way: "the nave behind" },
  ],
} as const satisfies Place
