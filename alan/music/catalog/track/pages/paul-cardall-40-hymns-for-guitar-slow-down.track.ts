import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarSlowDown = {
  id: "01a0b4c8-1d07-7bf7-9da2-dee80654782b",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-slow-down",
  ownLength: 2.0252333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 34,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0xymtjLptn73r0GkPdJWzc",
      externalLink: "https://open.spotify.com/track/0xymtjLptn73r0GkPdJWzc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Slow Down",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "slowdown|7FQRbf8gbKw8KZQZAJWxH2|121514",
  song: "song/paul-cardall-slow-down",
} as const satisfies Track
