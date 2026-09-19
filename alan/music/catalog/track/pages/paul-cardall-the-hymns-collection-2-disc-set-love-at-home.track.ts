import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheHymnsCollection2DiscSetLoveAtHome = {
  id: "01a0b4c8-4f12-7b9c-93b4-a0665ed58ce3",
  type: "page-type/track",
  slug: "paul-cardall-the-hymns-collection-2-disc-set-love-at-home",
  ownLength: 3.8147333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-hymns-collection-2-disc-set"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jWo8LBQY56rjX1lQmChkt",
      externalLink: "https://open.spotify.com/track/0jWo8LBQY56rjX1lQmChkt",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Love At Home",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "loveathome|7FQRbf8gbKw8KZQZAJWxH2|228884",
  song: "song/paul-cardall-love-at-home",
} as const satisfies Track
