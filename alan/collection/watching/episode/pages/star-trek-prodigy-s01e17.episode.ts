import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e17 = {
  id: "01a18853-1b88-71dd-8100-f7e37decb766",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e17",
  description:
    "When the crew gets trapped in the holodeck by a mysterious malfunction, they aren't sure what's programmed or what's real.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 17,
  publishedAt: "2022-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3983097",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/17",
    },
  ],
  title: "Ghost in the Machine",
  episodeType: "standard",
  stillPath: "/wDyRKxpk7oKbhv3PikbTpQFTDcu.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
