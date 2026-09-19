import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetGoodGraces = {
  id: "01a0b111-1fa4-738e-9c08-4cf858b76557",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-good-graces",
  ownLength: 3.08775,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "102YUQbYmwdBXS7jwamI90",
      externalLink: "https://open.spotify.com/track/102YUQbYmwdBXS7jwamI90",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Good Graces",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "goodgraces|74KM79TiuVKeVCqs8QtB0B|185265",
  song: "song/sabrina-carpenter-good-graces",
} as const satisfies Track
