import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsComeComeYeSaints = {
  id: "01a0b4c8-6434-7daa-9c33-676db469e445",
  type: "page-type/track",
  slug: "paul-cardall-hymns-come-come-ye-saints",
  ownLength: 4.173333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7q8oa4YYFYCxVa6gKNj2tU",
      externalLink: "https://open.spotify.com/track/7q8oa4YYFYCxVa6gKNj2tU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Come, Come Ye Saints",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "comecomeyesaints|7FQRbf8gbKw8KZQZAJWxH2|250400",
  song: "song/paul-cardall-come-come-ye-saints",
} as const satisfies Track
