import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e05 = {
  id: "01a18853-1b89-7abd-8903-05c058330430",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e05",
  description:
    "Reunited on the Voyager and under strict supervision, the gang must decode a secret message their mysterious benefactor left with Murf.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 5,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230738",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/5",
    },
  ],
  title: "Observer's Paradox",
  episodeType: "standard",
  stillPath: "/7QdhyMGSgTIqUPlxME06ZeBqJZ6.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
