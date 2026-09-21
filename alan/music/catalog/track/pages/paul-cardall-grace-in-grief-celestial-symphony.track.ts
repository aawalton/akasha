import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefCelestialSymphony = {
  id: "01a0b4c8-255a-79d9-97ca-9b47cdef6098",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-celestial-symphony",
  ownLength: 5.214583333333334,
  ownProgress: 5.214583333333334,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hgDwWRa1M4Zb95eWGxZ5L",
      externalLink: "https://open.spotify.com/track/7hgDwWRa1M4Zb95eWGxZ5L",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Celestial Symphony",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "celestialsymphony|7FQRbf8gbKw8KZQZAJWxH2|312875",
  song: "song/paul-cardall-celestial-symphony",
  carriedBy: [
    {
      release: "release/paul-cardall-grace-in-grief",
      discNumber: 1,
      position: 3,
      externalId: "7hgDwWRa1M4Zb95eWGxZ5L",
      externalLink: "https://open.spotify.com/track/7hgDwWRa1M4Zb95eWGxZ5L",
    },
  ],
} as const satisfies Track
