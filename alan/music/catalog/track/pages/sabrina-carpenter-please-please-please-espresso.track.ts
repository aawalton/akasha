import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePleaseEspresso = {
  id: "01a0b111-2b12-72cc-87ad-b92c226e4a66",
  type: "page-type/track",
  slug: "sabrina-carpenter-please-please-please-espresso",
  ownLength: 2.9243166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-please-please-please"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5KRy7KqBVoxYVSnzdkdq2w",
      externalLink: "https://open.spotify.com/track/5KRy7KqBVoxYVSnzdkdq2w",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Espresso",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "espresso|74KM79TiuVKeVCqs8QtB0B|175459",
  song: "song/sabrina-carpenter-espresso",
} as const satisfies Track
