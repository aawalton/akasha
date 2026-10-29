import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e25 = {
  id: "01a18843-d14e-79d3-8dac-aeff5f90fc3e",
  type: "page-type/episode",
  slug: "bluey-s01e25",
  description:
    "Bluey is running a taxi service. Her first passenger is Businessman Dad, who is in a rush to get to the airport. But with unexpected delays, Dad's in danger of missing his flight!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 25,
  publishedAt: "2018-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1601151",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/25",
    },
  ],
  title: "Taxi",
  episodeType: "standard",
  stillPath: "/lMfAZViQaxM9UD3ObU56X04wi0S.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
