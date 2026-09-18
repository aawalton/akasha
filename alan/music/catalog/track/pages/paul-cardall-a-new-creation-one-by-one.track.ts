import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationOneByOne = {
  id: "01a0b4c8-3694-7f69-878a-7abcd267c783",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-one-by-one",
  ownLength: 6.267333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6OHDaQfpRUWTjY5jOe7Yth",
      externalLink: "https://open.spotify.com/track/6OHDaQfpRUWTjY5jOe7Yth",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "One by One",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "onebyone|7FQRbf8gbKw8KZQZAJWxH2|376040",
} as const satisfies Track
