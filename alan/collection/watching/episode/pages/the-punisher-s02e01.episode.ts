import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const thePunisherS02e01 = {
  id: "01a18857-ec89-77c3-a5df-d16eac2f15f3",
  type: "page-type/episode",
  slug: "the-punisher-s02e01",
  description:
    "While driving through Michigan, Frank stops for a beer at a roadside bar. But staying out of trouble has never been his strong suit.",
  ownLength: 53,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-the-punisher-season-2"],
  position: 1,
  publishedAt: "2019-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1658202",
      externalLink: "https://www.themoviedb.org/tv/67178/season/2/episode/1",
    },
  ],
  title: "Roadhouse Blues",
  episodeType: "standard",
  stillPath: "/p6b8Au2By66QENIUrmnc4tqydlN.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:47:05.993Z",
  updatedAt: "2026-10-29T15:47:05.993Z",
} as const satisfies Episode
