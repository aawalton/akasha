import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS05e09 = {
  id: "01a18852-a9f8-7d48-8070-50d5f84c9c90",
  type: "page-type/episode",
  slug: "star-trek-discovery-s05e09",
  description:
    "After Moll and the Breen capture a mysterious structure that contains the Progenitors' power, Captain Burnham must lead a covert mission to retrieve it before the Breen figure out how to use it.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-5"],
  position: 9,
  publishedAt: "2024-05-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5054506",
      externalLink: "https://www.themoviedb.org/tv/67198/season/5/episode/9",
    },
  ],
  title: "Lagrange Point",
  episodeType: "standard",
  stillPath: "/298Fa4J9B457VbXLwFf1LZoly9M.jpg",
  voteAverage: 4.8,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
