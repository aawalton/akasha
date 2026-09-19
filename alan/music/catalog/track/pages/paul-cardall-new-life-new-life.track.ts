import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeNewLife = {
  id: "01a0b4c8-403c-735d-9b5d-349360d4c585",
  type: "page-type/track",
  slug: "paul-cardall-new-life-new-life",
  ownLength: 3.5622166666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65jYrSodnJTrBVTD67e5Y3",
      externalLink: "https://open.spotify.com/track/65jYrSodnJTrBVTD67e5Y3",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "New Life",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "newlife|7FQRbf8gbKw8KZQZAJWxH2|213733",
  song: "song/paul-cardall-new-life",
} as const satisfies Track
