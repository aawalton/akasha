import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e06 = {
  id: "01a1884b-ef63-7c71-a2ce-6dd94a5aeeae",
  type: "page-type/episode",
  slug: "ncis-s02e06",
  description:
    "The team must protect an Iraq veteran due to the threats made by terrorists. While trying to convince FBI Agent Lina Reyes to help them, the team are convinced that they have discovered the bomber.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 6,
  publishedAt: "2004-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334501",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/6",
    },
  ],
  title: "Terminal Leave",
  episodeType: "standard",
  stillPath: "/so10ph6K6aRJUthkfkbXe45pcwT.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
