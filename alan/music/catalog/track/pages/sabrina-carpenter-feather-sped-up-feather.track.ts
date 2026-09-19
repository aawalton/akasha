import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFeatherSpedUpFeather = {
  id: "01a0b111-2d8d-71de-a2b4-fb4c33e96933",
  type: "page-type/track",
  slug: "sabrina-carpenter-feather-sped-up-feather",
  ownLength: 3.0925333333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-feather-sped-up"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1V7sKms8MbsSYYtecDE2CW",
      externalLink: "https://open.spotify.com/track/1V7sKms8MbsSYYtecDE2CW",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Feather",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "feather|74KM79TiuVKeVCqs8QtB0B|185552",
  song: "song/sabrina-carpenter-feather",
} as const satisfies Track
