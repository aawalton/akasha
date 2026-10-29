import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS02e17 = {
  id: "01a18853-1b8a-7bca-add2-f4bb1679c123",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s02e17",
  description:
    "As war looms between the Federation and Solum, Gwyn proposes to lead the cadets on an undercover mission to gather intelligence and rescue Ilthuran.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-2"],
  position: 17,
  publishedAt: "2024-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5230751",
      externalLink: "https://www.themoviedb.org/tv/106393/season/2/episode/17",
    },
  ],
  title: "Brink",
  episodeType: "standard",
  stillPath: "/c6DVp56o9z8yorynZNsGc8H3omD.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
