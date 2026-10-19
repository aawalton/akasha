import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixFirst = {
  id: "01a0676a-d71e-7001-bfdd-3309c4440142",
  type: "page-type/release",
  slug: "pentatonix-first",
  title: "First",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 17.234366666666666,
  ownProgress: 17.234367,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-05-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Xp506l5LAdPyMRW0xDdr0",
      externalLink: "https://open.spotify.com/album/4Xp506l5LAdPyMRW0xDdr0",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Release
