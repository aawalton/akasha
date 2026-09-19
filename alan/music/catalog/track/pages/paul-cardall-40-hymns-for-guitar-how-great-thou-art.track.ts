import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarHowGreatThouArt = {
  id: "01a0b4c8-19a3-7b9e-be38-c895340bf8d0",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-how-great-thou-art",
  ownLength: 3.285416666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GJZSvkxqxpjoXD5WXserT",
      externalLink: "https://open.spotify.com/track/5GJZSvkxqxpjoXD5WXserT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "How Great Thou Art",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "howgreatthouart|7FQRbf8gbKw8KZQZAJWxH2|197125",
  song: "song/paul-cardall-how-great-thou-art",
} as const satisfies Track
