import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e06 = {
  id: "01a1884b-ef7c-7ca1-9c1b-ea5a0e738967",
  type: "page-type/episode",
  slug: "ncis-s19e06",
  description:
    "NCIS investigates the death of a beloved Navy commander who trained some of the top athletes in the country.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 6,
  publishedAt: "2021-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248850",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/6",
    },
  ],
  title: "False Start",
  episodeType: "standard",
  stillPath: "/7dghCOKSalQXeZ1ljTMPX7HgA4Z.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
