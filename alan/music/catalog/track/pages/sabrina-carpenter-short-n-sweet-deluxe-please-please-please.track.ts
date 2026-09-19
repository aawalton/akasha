import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxePleasePleasePlease = {
  id: "01a0b111-1d0e-75bc-a2ad-6a70f6843ce4",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-please-please-please",
  ownLength: 3.106,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2OyX4SHk1oVRBP2dBOqRqC",
      externalLink: "https://open.spotify.com/track/2OyX4SHk1oVRBP2dBOqRqC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Please Please Please",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "pleasepleaseplease|74KM79TiuVKeVCqs8QtB0B|186360",
  song: "song/sabrina-carpenter-please-please-please",
} as const satisfies Track
