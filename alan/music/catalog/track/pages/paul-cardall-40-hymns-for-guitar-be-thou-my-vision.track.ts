import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarBeThouMyVision = {
  id: "01a0b4c8-1a24-7a5a-8acd-63f2d44461fd",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-be-thou-my-vision",
  ownLength: 3.2333333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Y9Cs5xWrJG7RVFaBtpjlV",
      externalLink: "https://open.spotify.com/track/0Y9Cs5xWrJG7RVFaBtpjlV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Be Thou My Vision",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "bethoumyvision|7FQRbf8gbKw8KZQZAJWxH2|194000",
  song: "song/paul-cardall-be-thou-my-vision",
} as const satisfies Track
