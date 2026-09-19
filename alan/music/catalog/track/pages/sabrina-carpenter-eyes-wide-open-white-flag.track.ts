import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEyesWideOpenWhiteFlag = {
  id: "01a0b111-299c-7db1-a782-b4cfad8b3234",
  type: "page-type/track",
  slug: "sabrina-carpenter-eyes-wide-open-white-flag",
  ownLength: 3.306433333333333,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-eyes-wide-open"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6xQdHOX1Tq3IrKsQdLs0nc",
      externalLink: "https://open.spotify.com/track/6xQdHOX1Tq3IrKsQdLs0nc",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "White Flag",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "whiteflag|74KM79TiuVKeVCqs8QtB0B|198386",
  song: "song/sabrina-carpenter-white-flag",
} as const satisfies Track
