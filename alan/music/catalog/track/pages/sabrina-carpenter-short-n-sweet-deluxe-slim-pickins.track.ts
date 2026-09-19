import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeSlimPickins = {
  id: "01a0b111-1e15-7663-9111-fbe6b0fe7ca3",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-slim-pickins",
  ownLength: 2.5366666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "13djc4bqGG8n26PmsAuByA",
      externalLink: "https://open.spotify.com/track/13djc4bqGG8n26PmsAuByA",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Slim Pickins",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "slimpickins|74KM79TiuVKeVCqs8QtB0B|152200",
  song: "song/sabrina-carpenter-slim-pickins",
} as const satisfies Track
