import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleAllISeeIsSnow = {
  id: "01a0b4c8-2fa7-7421-b340-138514a013f2",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-all-i-see-is-snow",
  ownLength: 4.556,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5KJqcYc9vpURfiU0EuWBMi",
      externalLink: "https://open.spotify.com/track/5KJqcYc9vpURfiU0EuWBMi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "All I See Is Snow",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "0Bvs8yPjrQSbmVIRqSg1Sp", artistName: "Thompson Square" },
  ],
  trackKey: "alliseeissnow|0Bvs8yPjrQSbmVIRqSg1Sp,7FQRbf8gbKw8KZQZAJWxH2|273360",
  song: "song/paul-cardall-all-i-see-is-snow",
} as const satisfies Track
