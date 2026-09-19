import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarWhereYouThere = {
  id: "01a0b4c8-1a6b-7fcd-8d0a-7bfd18b6e0a9",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-where-you-there",
  ownLength: 3.8001666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Xxxi8di7yYjgiG07lyIsk",
      externalLink: "https://open.spotify.com/track/3Xxxi8di7yYjgiG07lyIsk",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Where You There",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "whereyouthere|7FQRbf8gbKw8KZQZAJWxH2|228010",
  song: "song/paul-cardall-where-you-there",
} as const satisfies Track
