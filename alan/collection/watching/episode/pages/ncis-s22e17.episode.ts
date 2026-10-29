import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e17 = {
  id: "01a1884b-ef84-7aa4-9a9f-8ab0c7094ff3",
  type: "page-type/episode",
  slug: "ncis-s22e17",
  description:
    'After NCIS captures the hitman known as "The Poet," the team races to uncover who ordered the assassination of a Navy chief.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 17,
  publishedAt: "2025-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6052057",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/17",
    },
  ],
  title: "Killer Instinct",
  episodeType: "standard",
  stillPath: "/6SQtOENDGJazte0IXJjWjcDI922.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
