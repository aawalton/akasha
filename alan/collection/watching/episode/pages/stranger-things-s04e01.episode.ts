import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS04e01 = {
  id: "01a18855-9113-7908-989a-4f4389dac041",
  type: "page-type/episode",
  slug: "stranger-things-s04e01",
  description:
    "El is bullied at school. Joyce opens a mysterious package. A scrappy player shakes up D&D night.",
  ownLength: 79,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-4"],
  position: 1,
  publishedAt: "2022-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2551221",
      externalLink: "https://www.themoviedb.org/tv/66732/season/4/episode/1",
    },
  ],
  title: "Chapter One: The Hellfire Club",
  episodeType: "standard",
  stillPath: "/xeNKubDmPiMraW4hXqzEBrN6f4A.jpg",
  voteAverage: 8.654,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
