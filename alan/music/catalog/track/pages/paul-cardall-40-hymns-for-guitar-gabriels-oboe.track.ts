import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarGabrielsOboe = {
  id: "01a0b4c8-1ce1-7055-b99d-cf17d658b6c8",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-gabriels-oboe",
  ownLength: 2.55,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 33,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4OA0vYJWu3WMa8Z12ex6ri",
      externalLink: "https://open.spotify.com/track/4OA0vYJWu3WMa8Z12ex6ri",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gabriel's Oboe",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "gabrielsoboe|7FQRbf8gbKw8KZQZAJWxH2|153000",
} as const satisfies Track
