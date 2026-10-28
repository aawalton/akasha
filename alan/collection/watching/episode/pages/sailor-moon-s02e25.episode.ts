import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sailorMoonS02e25 = {
  id: "01a183d8-4894-73f0-96f4-c98b85698b08",
  type: "page-type/episode",
  slug: "sailor-moon-s02e25",
  description:
    "Ami enters an international chess tournament at the Chess Tower, and discovers that Berthier has targeted the building.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/sailor-moon-season-2"],
  position: 25,
  publishedAt: "1993-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "992367",
      externalLink: "https://www.themoviedb.org/tv/3570/season/2/episode/25",
    },
  ],
  title: "Checkmate",
  episodeType: "standard",
  stillPath: "/aROCguCwmdQYy4gCnaXhKWjdfEZ.jpg",
  voteAverage: 7,
  createdAt: "2026-10-28T18:49:12.078Z",
  updatedAt: "2026-10-28T18:49:12.078Z",
} as const satisfies Episode
