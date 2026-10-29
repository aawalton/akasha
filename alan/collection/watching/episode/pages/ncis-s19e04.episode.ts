import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e04 = {
  id: "01a1884b-ef7c-772f-ab28-990389ec19eb",
  type: "page-type/episode",
  slug: "ncis-s19e04",
  description:
    "Gibbs and McGee head to Alaska while the team works at home to uncover the conspiracy behind the serial killer.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 4,
  publishedAt: "2021-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248846",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/4",
    },
  ],
  title: "Great Wide Open",
  episodeType: "standard",
  stillPath: "/eGWeW0ZChX43G0YSTtGik2jIcDi.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
