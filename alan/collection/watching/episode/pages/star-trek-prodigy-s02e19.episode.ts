import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e19 = {
  id: "01a18853-1b8a-73aa-b4a7-78cf03fb2f34",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e19",
  description:
    "A desperate Asencia launches an all-out attack on the Federation that will destroy subspace, while Wesley and the cadets try to correct the timeline.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 19,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230753",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/19",
    },
  ],
  title: "Ouroboros (1)",
  episodeType: "standard",
  stillPath: "/xw8b9xDqatmejhF4huvfgipwkC7.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
