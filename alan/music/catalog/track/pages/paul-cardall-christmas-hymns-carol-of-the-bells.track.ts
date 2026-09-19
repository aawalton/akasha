import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasHymnsCarolOfTheBells = {
  id: "01a0b4c8-5431-72fb-9a64-2df144db797b",
  type: "page-type/track",
  slug: "paul-cardall-christmas-hymns-carol-of-the-bells",
  ownLength: 5.444216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-christmas-hymns"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3pvJZWw19gTR7143IAYG7P",
      externalLink: "https://open.spotify.com/track/3pvJZWw19gTR7143IAYG7P",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Carol of the Bells",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "carolofthebells|7FQRbf8gbKw8KZQZAJWxH2|326653",
  song: "song/paul-cardall-carol-of-the-bells",
} as const satisfies Track
