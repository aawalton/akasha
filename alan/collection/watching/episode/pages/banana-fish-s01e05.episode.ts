import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bananaFishS01e05 = {
  id: "01a183dd-ecba-7ac9-a015-194dc3da241f",
  type: "page-type/episode",
  slug: "banana-fish-s01e05",
  description:
    "With Jenkins' discretion, Ash is released. Upon finding out that Griffin has died, Ash tries to go to Golzine by himself. But Eiji insists that the reason Griffin died was because of him, and forcibly follows Ash.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/banana-fish-season-1"],
  position: 5,
  publishedAt: "2018-08-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1516190",
      externalLink: "https://www.themoviedb.org/tv/80564/season/1/episode/5",
    },
  ],
  title: "From Death to Morning",
  episodeType: "standard",
  stillPath: "/zRoE9pD7pVh2lRZKcq3N6B0nKED.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:55:21.786Z",
  updatedAt: "2026-10-28T18:55:21.786Z",
} as const satisfies Episode
