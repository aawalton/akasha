import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxTheChristmasBox = {
  id: "01a0b4c8-659f-78bf-9949-706f342e7d33",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-the-christmas-box",
  ownLength: 1.7888833333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4jZZ8mDC9dgj1z8vBQNovC",
      externalLink: "https://open.spotify.com/track/4jZZ8mDC9dgj1z8vBQNovC",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Christmas Box",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thechristmasbox|7FQRbf8gbKw8KZQZAJWxH2|107333",
} as const satisfies Track
