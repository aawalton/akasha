import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sylviaDaleySecureSecure = {
  id: "01a0a6c3-6da4-7ad1-a36d-b7aaed506317",
  type: "page-type/track",
  slug: "sylvia-daley-secure-secure",
  ownLength: 3.10795,
  ownProgress: 0,
  partOfCollections: ["release/sylvia-daley-secure"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "66RIcMxYr824yGrWTFdwEo",
      externalLink: "https://open.spotify.com/track/66RIcMxYr824yGrWTFdwEo",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Secure",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "03dXd2zBbBJvX60Oap8Lgo", artistName: "Sylvia Daley" }],
  trackKey: "secure|03dXd2zBbBJvX60Oap8Lgo|186477",
  song: "song/sylvia-daley-secure",
} as const satisfies Track
