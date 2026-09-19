import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEspressoEspresso = {
  id: "01a0b111-2c54-77c0-9450-5a168de29821",
  type: "page-type/track",
  slug: "sabrina-carpenter-espresso-espresso",
  ownLength: 2.9243166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-espresso"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qSkIjg1o9h3YT9RAgYN75",
      externalLink: "https://open.spotify.com/track/2qSkIjg1o9h3YT9RAgYN75",
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
