import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulDanzaDelAmor = {
  id: "01a0b4c8-5a2b-7e71-9bf7-75e625172907",
  type: "page-type/track",
  slug: "paul-cardall-faithful-danza-del-amor",
  ownLength: 3.9553333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-faithful"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ReUJHaFQJrzi4RyWj57vV",
      externalLink: "https://open.spotify.com/track/3ReUJHaFQJrzi4RyWj57vV",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Danza Del Amor",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "danzadelamor|7FQRbf8gbKw8KZQZAJWxH2|237320",
  song: "song/paul-cardall-danza-del-amor",
} as const satisfies Track
