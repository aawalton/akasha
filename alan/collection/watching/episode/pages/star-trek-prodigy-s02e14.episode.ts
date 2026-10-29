import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e14 = {
  id: "01a18853-1b89-7e58-bd87-550ef2bbefe3",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e14",
  description:
    "The Protostar's reunion with Voyager has unexpected side effects, bouncing the crew between alternate realities — including the Mirror Universe.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 14,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230748",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/14",
    },
  ],
  title: "Cracked Mirror",
  episodeType: "standard",
  stillPath: "/ArSkJLSOzEKhEe1xcUEVKeheVXY.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
