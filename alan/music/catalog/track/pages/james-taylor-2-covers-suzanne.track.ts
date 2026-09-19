import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSuzanne = {
  id: "01a0abeb-3468-7b73-a6a7-54b7eec8326a",
  type: "page-type/track",
  slug: "james-taylor-2-covers-suzanne",
  ownLength: 3.6064333333333334,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27GMmOPgdi6NEq3dAGZ6et",
      externalLink: "https://open.spotify.com/track/27GMmOPgdi6NEq3dAGZ6et",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Suzanne",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "suzanne|0vn7UBvSQECKJm2817Yf1P|216386",
  song: "song/james-taylor-suzanne",
} as const satisfies Track
