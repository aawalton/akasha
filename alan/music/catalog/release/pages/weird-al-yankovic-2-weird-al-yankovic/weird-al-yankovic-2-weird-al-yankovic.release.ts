import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const weirdAlYankovic2WeirdAlYankovic = {
  id: "01a0676a-d730-703b-93c6-fd84b0d2c60b",
  type: "page-type/release",
  slug: "weird-al-yankovic-2-weird-al-yankovic",
  title: '"Weird Al" Yankovic',
  partOfCollections: ["artist/weird-al-yankovic"],
  position: 0,
  ownLength: 32.958367,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1983-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1gnhuWdl30liEUM2jy9lxl",
      externalLink: "https://open.spotify.com/album/1gnhuWdl30liEUM2jy9lxl",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-15T16:40:16.000Z",
} as const satisfies Release
