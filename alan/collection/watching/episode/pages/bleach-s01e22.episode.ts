import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e22 = {
  id: "01a183d3-f474-7335-a08b-8e8d4bca5799",
  type: "page-type/episode",
  slug: "bleach-s01e22",
  description:
    "Ichigo Kurosaki and his friends are forced to find another way into Seireitei due to 3rd Division Captain Gin Ichimaru's intervention.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 22,
  publishedAt: "2005-03-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1517138",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/22",
    },
  ],
  title: "The Man who Hates Shinigami",
  episodeType: "standard",
  stillPath: "/rn9i4A3kxvLogqVEnLai1eutbbu.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
