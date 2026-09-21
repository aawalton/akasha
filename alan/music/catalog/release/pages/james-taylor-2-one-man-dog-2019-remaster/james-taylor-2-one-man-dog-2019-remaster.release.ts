import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2OneManDog2019Remaster = {
  id: "01a0676a-d726-702d-8627-ddeeda6a1105",
  type: "page-type/release",
  slug: "james-taylor-2-one-man-dog-2019-remaster",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1972-11-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5fgXXyM1kcpCz3z0XHRniE",
      externalLink: "https://open.spotify.com/album/5fgXXyM1kcpCz3z0XHRniE",
    },
  ],
  title: "One Man Dog (2019 Remaster)",
} as const satisfies Release
