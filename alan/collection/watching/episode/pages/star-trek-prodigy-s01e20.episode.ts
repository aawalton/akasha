import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e20 = {
  id: "01a18853-1b89-70d6-892f-3c8bb89935dc",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e20",
  description:
    "As the Federation hangs in the balance, the crew must make the ultimate sacrifice to save Starfleet's future.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 20,
  publishedAt: "2022-12-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983100",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/20",
    },
  ],
  title: "Supernova (2)",
  episodeType: "finale",
  stillPath: "/8aMbQgu8tFF68TVzLkF4PLKnLou.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
