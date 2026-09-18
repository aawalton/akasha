import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeReturnHome = {
  id: "01a0b4c8-2a12-79da-8c65-0ff9dce41b3c",
  type: "page-type/track",
  slug: "paul-cardall-return-home-return-home",
  ownLength: 2.5959,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48JD5xGtUJiKQJJAx8CzSp",
      externalLink: "https://open.spotify.com/track/48JD5xGtUJiKQJJAx8CzSp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Return Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "returnhome|7FQRbf8gbKw8KZQZAJWxH2|155754",
} as const satisfies Track
