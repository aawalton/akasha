import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e22 = {
  id: "01a1884b-ef70-7939-a837-4bff09d68aae",
  type: "page-type/episode",
  slug: "ncis-s10e22",
  description:
    "In retaliation for the murders of Eli David and Jackie Vance, the NCIS team feverishly searches for Bodnar despite orders from Homeland Security to relinquish the case.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 22,
  publishedAt: "2013-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334692",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/22",
    },
  ],
  title: "Revenge",
  episodeType: "standard",
  stillPath: "/jv73xAQYPglppEhlkWrvnrdwTvL.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
