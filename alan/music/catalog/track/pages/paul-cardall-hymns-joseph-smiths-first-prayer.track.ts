import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsJosephSmithsFirstPrayer = {
  id: "01a0b4c8-6235-7230-b59c-6ad0fbb7d4b2",
  type: "page-type/track",
  slug: "paul-cardall-hymns-joseph-smiths-first-prayer",
  ownLength: 3.3191,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Cji0LZjLdNeFdz8HXxR3d",
      externalLink: "https://open.spotify.com/track/3Cji0LZjLdNeFdz8HXxR3d",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Joseph Smith's First Prayer",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "josephsmithsfirstprayer|7FQRbf8gbKw8KZQZAJWxH2|199146",
  song: "song/paul-cardall-joseph-smiths-first-prayer",
} as const satisfies Track
