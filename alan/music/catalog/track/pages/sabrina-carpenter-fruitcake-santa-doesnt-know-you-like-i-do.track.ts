import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeSantaDoesntKnowYouLikeIDo = {
  id: "01a0b111-2cd8-7da3-8054-9609be3dc72b",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-santa-doesnt-know-you-like-i-do",
  ownLength: 3.16255,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mi0HQrZMhRb2MRdFiUP6v",
      externalLink: "https://open.spotify.com/track/5mi0HQrZMhRb2MRdFiUP6v",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "santa doesn’t know you like i do",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "santadoesntknowyoulikeido|74KM79TiuVKeVCqs8QtB0B|189753",
  song: "song/sabrina-carpenter-santa-doesnt-know-you-like-i-do",
} as const satisfies Track
