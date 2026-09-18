import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseGrateful = {
  id: "01a0b4c8-5149-707b-aa3e-31547d6198c4",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-grateful",
  ownLength: 3.744666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2lTJwqxbJDkxdR2HEoeKjj",
      externalLink: "https://open.spotify.com/track/2lTJwqxbJDkxdR2HEoeKjj",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Grateful",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "grateful|7FQRbf8gbKw8KZQZAJWxH2|224680",
} as const satisfies Track
