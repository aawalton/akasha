import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetCoincidence = {
  id: "01a0b111-1ff5-70fc-8008-6b402bb8754c",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-coincidence",
  ownLength: 2.7367,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5oIVNm56t6OIf9ZjdEG3ud",
      externalLink: "https://open.spotify.com/track/5oIVNm56t6OIf9ZjdEG3ud",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Coincidence",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "coincidence|74KM79TiuVKeVCqs8QtB0B|164202",
} as const satisfies Track
