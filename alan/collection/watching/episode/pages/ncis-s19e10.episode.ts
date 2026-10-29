import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e10 = {
  id: "01a1884b-ef7d-7247-9ab0-8d2cd8085745",
  type: "page-type/episode",
  slug: "ncis-s19e10",
  description:
    "NCIS is called in when Navy Chief Warrant Officer Rafi Nazar is suspected of trying to sell stolen classified Navy software used to pilot combat drones.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 10,
  publishedAt: "2022-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248854",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/10",
    },
  ],
  title: "Pledge of Allegiance",
  episodeType: "standard",
  stillPath: "/n22H93XEYuKmsWuIYu3OnEtP8uF.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
