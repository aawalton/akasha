import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterThumbsAcousticThumbsAcoustic = {
  id: "01a0b111-32ee-7744-9c58-c0cef2fb4141",
  type: "page-type/track",
  slug: "sabrina-carpenter-thumbs-acoustic-thumbs-acoustic",
  ownLength: 3.4045666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-thumbs-acoustic"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1soAeZZbjaECAC5IH0CNiL",
      externalLink: "https://open.spotify.com/track/1soAeZZbjaECAC5IH0CNiL",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Thumbs - Acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "thumbsacoustic|74KM79TiuVKeVCqs8QtB0B|204274",
  song: "song/sabrina-carpenter-thumbs",
} as const satisfies Track
