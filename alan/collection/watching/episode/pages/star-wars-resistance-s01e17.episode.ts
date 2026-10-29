import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e17 = {
  id: "01a18853-f9af-7191-bd9e-305010ba79ef",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e17",
  description:
    "Kaz and Torra investigate the disappearance of a friend and plan to free them from the First Order.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 17,
  publishedAt: "2019-02-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1715374",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/17",
    },
  ],
  title: "The Disappeared",
  episodeType: "standard",
  stillPath: "/qWNtcniIYLOjVTIHs8JviJwOA5.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
