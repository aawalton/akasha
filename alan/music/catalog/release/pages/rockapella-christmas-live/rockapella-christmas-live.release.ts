import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaChristmasLive = {
  id: "01a0676a-d71a-703f-aa4c-3716fe97e388",
  type: "page-type/release",
  slug: "rockapella-christmas-live",
  title: "Christmas Live",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 40.95948333333333,
  ownProgress: 40.959483,
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
} as const satisfies Release
