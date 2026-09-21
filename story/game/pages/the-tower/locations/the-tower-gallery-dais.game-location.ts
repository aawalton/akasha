import type { GameLocation } from "akasha/story/game/location/game-location.page-type.types.ts"

export const theTowerGalleryDais = {
  id: "01a0c65d-1e0e-78a0-b2fb-08f858bf7899",
  type: "page-type/game-location",
  slug: "the-tower-gallery-dais",
  title: "The Warden's Dais",
  game: "game/the-tower",
  within: "game-location/the-tower-floor-03",
  depth: 3,
  description:
    "The raised platform at the gallery's end. The Plinth Golem sits before the sealed archway, a seated stone colossus, utterly still until something tries to pass it. Its torso is built around a single keystone plinth at the sternum — the load-bearing block its whole mass rests on.",
  exits: ["the sealed arch ahead; the nave behind"],
  conditions: [
    { name: "light", note: "amber, brightest at the dais" },
    { name: "water", note: "NONE." },
  ],
  things: [
    {
      name: "the seated Plinth Golem (on the dais)",
      use: "dormant until the arch is approached or it is struck. Waking it is optional ONLY if the arch can be reached past it — it cannot (it fills the way). It must be dropped.",
      note: "the floor boss; geometry forces the fight",
    },
    {
      name: "the keystone plinth (Golem's sternum)",
      use: "THE weakness — a single load-bearing block bearing the whole construct. A precise strike there (INT read + FIN placement, NOT brute MIGHT) collapses it. See readableTrait gate.",
      note: "the entire fight is 'find and hit the keystone'",
    },
    {
      name: "the sealed archway (behind the Golem)",
      use: "the exit up. Keyed to the floor's wardens — both the Cantor and the Golem must fall. Flush-sealed, no lever.",
      note: "clearing the floor opens it",
    },
  ],
} as const satisfies GameLocation
