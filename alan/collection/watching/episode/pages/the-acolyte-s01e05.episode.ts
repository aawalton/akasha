import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theAcolyteS01e05 = {
  id: "01a18855-e4ab-7151-82bd-385cafda9b39",
  type: "page-type/episode",
  slug: "the-acolyte-s01e05",
  description:
    "In a dense jungle, the Jedi are put to the test when they confront a rising darkness.",
  ownLength: 35,
  ownProgress: 0,
  partOfCollections: ["season/the-acolyte-season-1"],
  position: 5,
  publishedAt: "2024-06-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5220956",
      externalLink: "https://www.themoviedb.org/tv/114479/season/1/episode/5",
    },
  ],
  title: "Night",
  episodeType: "standard",
  stillPath: "/yciO9MBnZstxNWgWWbNztb77Z3w.jpg",
  voteAverage: 5.6,
  createdAt: "2026-10-29T15:44:52.906Z",
  updatedAt: "2026-10-29T15:44:52.906Z",
} as const satisfies Episode
