import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e05 = {
  id: "01a1887e-62a5-767c-bbae-2634fa06d9f2",
  type: "page-type/episode",
  slug: "elementary-s01e05",
  description:
    "Sherlock tries to determine who has been killing weak and terminal patients at a hospital, making it look like they died of natural causes. Meanwhile, Sherlock learns more about Joan’s decision to walk away from her surgical career.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 5,
  publishedAt: "2012-11-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64289",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/5",
    },
  ],
  title: "Lesser Evils",
  episodeType: "standard",
  stillPath: "/4t3LjZucO4UxEAgQn6FvXl14WQU.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
