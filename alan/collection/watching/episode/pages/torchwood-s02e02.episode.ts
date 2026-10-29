import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const torchwoodS02e02 = {
  id: "01a18859-3c69-76ae-830d-38a434484837",
  type: "page-type/episode",
  slug: "torchwood-s02e02",
  description:
    "When a burglary turns into a slaughter, Torchwood suspect alien involvement. Who is Beth, and can she be as innocent as she seems? But when the investigation escalates into a city-wide assault, Jack realises that the whole planet is in danger.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/torchwood-season-2"],
  position: 2,
  publishedAt: "2008-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "21567",
      externalLink: "https://www.themoviedb.org/tv/424/season/2/episode/2",
    },
  ],
  title: "Sleeper",
  episodeType: "standard",
  stillPath: "/yeQHQJUZh994Mk1swETNbpJUqZD.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:48:31.976Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Episode
