import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaChristmasLive = {
  id: "01a0676a-d71a-703f-aa4c-3716fe97e388",
  type: "page-type/release",
  slug: "rockapella-christmas-live",
  title: "Christmas Live",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-12-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4qq6lk5dA23eAKI7Dut0jV",
      externalLink: "https://open.spotify.com/album/4qq6lk5dA23eAKI7Dut0jV",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
