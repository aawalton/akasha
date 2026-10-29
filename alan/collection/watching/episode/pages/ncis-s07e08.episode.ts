import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e08 = {
  id: "01a1884b-ef6a-7af9-8438-67b5981346b6",
  type: "page-type/episode",
  slug: "ncis-s07e08",
  description:
    "The team literally finds themselves in the dark when the investigation into the death of a Lieutenant is connected to a city-wide blackout.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 8,
  publishedAt: "2009-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334550",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/8",
    },
  ],
  title: "Power Down",
  episodeType: "standard",
  stillPath: "/sF8UM0Yf4ShobrevsOAWuOn4RAL.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
