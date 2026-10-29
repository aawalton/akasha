import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e06 = {
  id: "01a18881-51a1-72df-aac7-815c1e364353",
  type: "page-type/episode",
  slug: "white-collar-s03e06",
  description: "A teenage con man goes on a New York crime spree.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/white-collar-season-3"],
  position: 6,
  publishedAt: "2011-07-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596279",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/6",
    },
  ],
  title: "Scott Free",
  episodeType: "standard",
  stillPath: "/7PSlDu46XEfrtKz1aSjzuSguqs3.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
