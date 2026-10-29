import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e01 = {
  id: "01a1884b-ef79-7309-9663-4c40f2bcd0b6",
  type: "page-type/episode",
  slug: "ncis-s17e01",
  description:
    "Ziva surprises Gibbs with a cryptic warning, prompting him to question why she remained underground for years while being presumed dead by family and friends, and what led to her return.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 1,
  publishedAt: "2019-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1824240",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/1",
    },
  ],
  title: "Out of the Darkness",
  episodeType: "standard",
  stillPath: "/vso07V1hov1tbxjcTh1EERQm2QA.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
