import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const echoS01e04 = {
  id: "01a18848-0cdb-759e-b3ef-144d521af6a0",
  type: "page-type/episode",
  slug: "echo-s01e04",
  description:
    "Maya finds herself at a crossroads, facing the shadows of her past and contemplating her future.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/echo-miniseries"],
  position: 4,
  publishedAt: "2024-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4889379",
      externalLink: "https://www.themoviedb.org/tv/122226/season/1/episode/4",
    },
  ],
  title: "Taloa",
  episodeType: "standard",
  stillPath: "/cpRkUWKz53P2TDMt5HM6G7Y2g8X.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:29:45.691Z",
  updatedAt: "2026-10-29T15:29:45.691Z",
} as const satisfies Episode
