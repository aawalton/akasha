import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeComingHome = {
  id: "01a0b4c8-3fa9-77b2-bd9b-4dd2d6e1e28c",
  type: "page-type/track",
  slug: "paul-cardall-new-life-coming-home",
  ownLength: 2.102,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0zw19xCUkDVCJTZKKUfyQi",
      externalLink: "https://open.spotify.com/track/0zw19xCUkDVCJTZKKUfyQi",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Coming Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "cominghome|7FQRbf8gbKw8KZQZAJWxH2|126120",
} as const satisfies Track
