import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e03 = {
  id: "01a1884b-ef7a-7042-94a7-c09a564e31dd",
  type: "page-type/episode",
  slug: "ncis-s18e03",
  description:
    "The discovery of two dead bodies leads the NCIS team into the wild world of modern-day treasure hunting.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 3,
  publishedAt: "2020-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2528355",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/3",
    },
  ],
  title: "Blood And Treasure",
  episodeType: "standard",
  stillPath: "/5QgIXFRmE7LW997e0YY2LXWn4Ez.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
