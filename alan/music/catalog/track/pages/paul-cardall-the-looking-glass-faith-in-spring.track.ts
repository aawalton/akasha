import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassFaithInSpring = {
  id: "01a0b4c8-6196-71b4-b49a-031ef2099f2b",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-faith-in-spring",
  ownLength: 2.3848833333333332,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "28DUyTFjufXwQE961pinzv",
      externalLink: "https://open.spotify.com/track/28DUyTFjufXwQE961pinzv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Faith In Spring",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "faithinspring|7FQRbf8gbKw8KZQZAJWxH2|143093",
  song: "song/paul-cardall-faith-in-spring",
} as const satisfies Track
