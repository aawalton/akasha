import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeCoincidence = {
  id: "01a0b111-1d81-7bb9-a8f8-c7618a624cd7",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-coincidence",
  ownLength: 2.736666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wJkgAZNkRMQz1FOMS5z6Y",
      externalLink: "https://open.spotify.com/track/7wJkgAZNkRMQz1FOMS5z6Y",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Coincidence",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "coincidence|74KM79TiuVKeVCqs8QtB0B|164200",
  song: "song/sabrina-carpenter-coincidence",
} as const satisfies Track
