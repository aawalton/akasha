import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS01e06 = {
  id: "01a18845-e1fa-7909-be19-279ca4c713f2",
  type: "page-type/episode",
  slug: "daredevil-s01e06",
  description: "When a serial killer terrorizes the streets of New York, the city needs a savior.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-1"],
  position: 6,
  publishedAt: "2025-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5688006",
      externalLink: "https://www.themoviedb.org/tv/202555/season/1/episode/6",
    },
  ],
  title: "Excessive Force",
  episodeType: "standard",
  stillPath: "/pAFBzoRUqhF48q907Kk4tB4zgr7.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
