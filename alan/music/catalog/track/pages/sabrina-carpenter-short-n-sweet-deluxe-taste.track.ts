import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeTaste = {
  id: "01a0b111-1ced-7809-a7b5-530872d36cb6",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-taste",
  ownLength: 2.6213333333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lTDxglypMd8e8Q5hnmDnI",
      externalLink: "https://open.spotify.com/track/0lTDxglypMd8e8Q5hnmDnI",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Taste",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "taste|74KM79TiuVKeVCqs8QtB0B|157280",
  song: "song/sabrina-carpenter-taste",
} as const satisfies Track
