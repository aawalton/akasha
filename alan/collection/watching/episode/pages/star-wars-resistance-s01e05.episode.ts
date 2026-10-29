import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e05 = {
  id: "01a18853-f9af-75a7-9cc2-10a09257608c",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e05",
  description:
    "Kaz searches for two missing children for a sizeable reward only to discover the First Order is also hunting for them.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 5,
  publishedAt: "2018-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598479",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/5",
    },
  ],
  title: "The Children from Tehar",
  episodeType: "standard",
  stillPath: "/aOffZheSYrmuMHGPLvlXmZ1K3Mw.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
