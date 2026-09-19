import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarBlessedAssurance = {
  id: "01a0b4c8-197c-7a6e-bd34-e59d6cd5f0f5",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-blessed-assurance",
  ownLength: 2.7333333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RkrMX6BFoEDtHSy6Iw38j",
      externalLink: "https://open.spotify.com/track/1RkrMX6BFoEDtHSy6Iw38j",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Blessed Assurance",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "blessedassurance|7FQRbf8gbKw8KZQZAJWxH2|164000",
  song: "song/paul-cardall-blessed-assurance",
} as const satisfies Track
