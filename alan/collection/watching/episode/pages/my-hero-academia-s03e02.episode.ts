import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e02 = {
  id: "01a183d4-acc4-7004-8bf6-8cefed378cf0",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e02",
  description:
    "Class 1-A faces the first challenge of their summer training camp when they have to fight their way through “The Beast’s Forest” before lunch.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 2,
  publishedAt: "2018-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1448435",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/2",
    },
  ],
  title: "Wild, Wild Pussycats",
  episodeType: "standard",
  stillPath: "/2JiTX9BNFKxdy6nCCzYDJRj55uX.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
