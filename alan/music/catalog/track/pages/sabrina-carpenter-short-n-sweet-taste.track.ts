import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetTaste = {
  id: "01a0b111-1f57-74e1-b2c0-3c1e8fe6716a",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-taste",
  ownLength: 2.6213166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5G2f63n7IPVPPjfNIGih7Q",
      externalLink: "https://open.spotify.com/track/5G2f63n7IPVPPjfNIGih7Q",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Taste",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "taste|74KM79TiuVKeVCqs8QtB0B|157279",
  song: "song/sabrina-carpenter-taste",
} as const satisfies Track
