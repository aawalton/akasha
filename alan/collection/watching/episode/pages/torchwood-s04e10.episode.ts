import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS04e10 = {
  id: "01a18859-3c6a-7c3e-9989-81638298d8d1",
  type: "page-type/episode",
  slug: "torchwood-s04e10",
  description:
    "As the Torchwood team launch a final, desperate mission against the seemingly undefeatable Three Families, they realize it may come down to the ultimate sacrifice.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/miracle-day"],
  position: 10,
  publishedAt: "2011-09-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21619",
      externalLink: "https://www.themoviedb.org/tv/424/season/4/episode/10",
    },
  ],
  title: "The Blood Line",
  episodeType: "finale",
  stillPath: "/711UxeoqU0elKnJpUchOE9x2K72.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
