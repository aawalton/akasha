import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionThumbs = {
  id: "01a0b111-274f-783e-99d8-0d6d22cfcb9e",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-thumbs",
  ownLength: 3.6077666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WC5fhc9XMaCrUNKNjm9xE",
      externalLink: "https://open.spotify.com/track/6WC5fhc9XMaCrUNKNjm9xE",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Thumbs",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "thumbs|74KM79TiuVKeVCqs8QtB0B|216466",
  song: "song/sabrina-carpenter-thumbs",
} as const satisfies Track
