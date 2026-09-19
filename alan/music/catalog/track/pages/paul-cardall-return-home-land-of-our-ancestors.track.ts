import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeLandOfOurAncestors = {
  id: "01a0b4c8-2995-7864-9799-b37489b21552",
  type: "page-type/track",
  slug: "paul-cardall-return-home-land-of-our-ancestors",
  ownLength: 3.2319,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hd4bCb8YIGuCNQk66c9mZ",
      externalLink: "https://open.spotify.com/track/1hd4bCb8YIGuCNQk66c9mZ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Land of Our Ancestors",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "landofourancestors|7FQRbf8gbKw8KZQZAJWxH2|193914",
  song: "song/paul-cardall-land-of-our-ancestors",
} as const satisfies Track
