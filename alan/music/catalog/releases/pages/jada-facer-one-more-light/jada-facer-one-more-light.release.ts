import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const jadaFacerOneMoreLight = {
  id: "01a0676a-d726-7030-bfaa-0e75fa8f5aec",
  type: "release",
  slug: "jada-facer-one-more-light",
  title: "One More Light",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 4.221417,
  ownProgress: 4.221417,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-12-15",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1883JL5Y2SyjfxS5kYkFeB",
      externalLink: "https://open.spotify.com/album/1883JL5Y2SyjfxS5kYkFeB",
    },
  ],
} as const satisfies Release
