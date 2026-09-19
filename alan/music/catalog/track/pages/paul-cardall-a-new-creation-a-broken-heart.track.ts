import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationABrokenHeart = {
  id: "01a0b4c8-364e-70b9-b8d7-b79bfe38bd47",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-a-broken-heart",
  ownLength: 5.002883333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6E9tYJkh2ajjhOrXjlKuvd",
      externalLink: "https://open.spotify.com/track/6E9tYJkh2ajjhOrXjlKuvd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Broken Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "abrokenheart|7FQRbf8gbKw8KZQZAJWxH2|300173",
  song: "song/paul-cardall-a-broken-heart",
} as const satisfies Track
