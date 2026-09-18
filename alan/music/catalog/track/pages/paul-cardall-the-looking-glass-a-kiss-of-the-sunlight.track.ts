import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassAKissOfTheSunlight = {
  id: "01a0b4c8-6111-74f8-880e-4f53f4269f77",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-a-kiss-of-the-sunlight",
  ownLength: 3.8111,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ugj4jTTfq9hdSy61mzSEv",
      externalLink: "https://open.spotify.com/track/4ugj4jTTfq9hdSy61mzSEv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Kiss Of The Sunlight",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "akissofthesunlight|7FQRbf8gbKw8KZQZAJWxH2|228666",
} as const satisfies Track
