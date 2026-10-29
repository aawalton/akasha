import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e03 = {
  id: "01a18853-1b89-7d6c-82a4-4cae74f09b2e",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e03",
  description:
    "Traveling through the time rift, Dal and the crew search for Chakotay on Solum. With the support of her father, Gwyn challenges Asencia.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 3,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230736",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/3",
    },
  ],
  title: "Who Saves the Saviors",
  episodeType: "standard",
  stillPath: "/b7FFzj7RTs8XzMgwQYD14swpxRi.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
