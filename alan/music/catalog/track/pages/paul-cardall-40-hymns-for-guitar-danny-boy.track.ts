import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarDannyBoy = {
  id: "01a0b4c8-1c4c-7656-85d6-ee50627eefad",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-danny-boy",
  ownLength: 2.753416666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 29,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XaKGw5AFtVQ5nPRqCHcUl",
      externalLink: "https://open.spotify.com/track/4XaKGw5AFtVQ5nPRqCHcUl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Danny Boy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "dannyboy|7FQRbf8gbKw8KZQZAJWxH2|165205",
  song: "song/paul-cardall-danny-boy",
} as const satisfies Track
