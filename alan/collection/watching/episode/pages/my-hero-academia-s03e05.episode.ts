import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const myHeroAcademiaS03e05 = {
  id: "01a183d4-acc4-7f89-96a8-7b8acc7c91d8",
  type: "page-type/episode",
  slug: "my-hero-academia-s03e05",
  description:
    "Izuku finally makes it back to the training camp only to leave again with a message for Mandalay to broadcast.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/my-hero-academia-season-3"],
  position: 5,
  publishedAt: "2018-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1448439",
      externalLink: "https://www.themoviedb.org/tv/65930/season/3/episode/5",
    },
  ],
  title: "Drive It Home, Iron Fist!!!",
  episodeType: "standard",
  stillPath: "/7aPjqgFERzYc6UmzHEodlSb7yUH.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:45:15.586Z",
  updatedAt: "2026-10-28T18:45:15.586Z",
} as const satisfies Episode
