import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e09 = {
  id: "01a18853-ddfd-7ad6-90ef-b581f57164a4",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e09",
  description:
    "As the Empire attacks the rebel fleet on Garel, Kanan, and Ezra return to Lothal and find a former prisoner with knowledge about Ezra's parents.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 9,
  publishedAt: "2015-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1145354",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/9",
    },
  ],
  title: "Legacy",
  episodeType: "standard",
  stillPath: "/kHrwqiHEkrBDK2fumQDOcJB62pZ.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
