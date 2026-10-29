import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e08 = {
  id: "01a18859-6798-72a6-af2a-16e3b826f8df",
  type: "page-type/episode",
  slug: "upload-s03e08",
  description:
    "Nora takes the powerful Upload companies to court, but she may have bitten off more than she can chew.",
  ownLength: 37,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 8,
  publishedAt: "2023-11-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670018",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/8",
    },
  ],
  title: "Flesh and Blood",
  episodeType: "finale",
  stillPath: "/2Kp2SNMcJBExFBaThMXbWzr4JTn.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
