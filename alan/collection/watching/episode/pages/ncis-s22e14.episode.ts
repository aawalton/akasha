import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e14 = {
  id: "01a1884b-ef84-77ab-b74a-1701b1c9276f",
  type: "page-type/episode",
  slug: "ncis-s22e14",
  description:
    "When Torres receives a text from Jimmy's daughter saying she has discovered a large sum of money near a Naval library, the team works together to investigate.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 14,
  publishedAt: "2025-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5970361",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/14",
    },
  ],
  title: "Close to Home",
  episodeType: "standard",
  stillPath: "/89HqdnGnNZA9rNeXB5Nyifdx2MG.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
