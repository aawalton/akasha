import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarHeIsRisen = {
  id: "01a0b4c8-1dc4-7154-ab5e-e1b97c2b870d",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-he-is-risen",
  ownLength: 1.8432,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 39,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kx86Rr5p8lEBlh8RtRSac",
      externalLink: "https://open.spotify.com/track/4kx86Rr5p8lEBlh8RtRSac",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "He Is Risen",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "heisrisen|7FQRbf8gbKw8KZQZAJWxH2|110592",
  song: "song/paul-cardall-he-is-risen",
} as const satisfies Track
