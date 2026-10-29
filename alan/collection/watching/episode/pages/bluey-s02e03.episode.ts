import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e03 = {
  id: "01a18843-d150-7a8a-86ed-129cc3e40fd2",
  type: "page-type/episode",
  slug: "bluey-s02e03",
  description:
    "Bluey and Mum are off to Chloe's party and Bingo isn't invited. But armed with a magic featherwand that makes things incredibly heavy, Bingo can now stop them leaving the house.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 3,
  publishedAt: "2020-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194119",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/3",
    },
  ],
  title: "Featherwand",
  episodeType: "standard",
  stillPath: "/gZOBCTytqy7YDYUz4TJ8qcMxXIi.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
