import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e05 = {
  id: "01a18853-ddfc-757b-b08d-0d2504c2d5cd",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e05",
  description:
    "While on a supply run, Hera and Sabine find themselves stranded but not alone in a seemingly abandoned locale.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 5,
  publishedAt: "2014-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1014545",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/5",
    },
  ],
  title: "Out of Darkness",
  episodeType: "standard",
  stillPath: "/kel8CpsZBufLj5ERLWEQNsahgwe.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
