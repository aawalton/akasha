import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e24 = {
  id: "01a18843-d151-7742-b49e-dc571886dbb5",
  type: "page-type/episode",
  slug: "bluey-s02e24",
  description:
    "While Mum and Dad struggle to build new flat-pack furniture, Bluey and Bingo transform the empty boxes into their own new world.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 24,
  publishedAt: "2020-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2218574",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/24",
    },
  ],
  title: "Flat Pack",
  episodeType: "standard",
  stillPath: "/dkAN8roEFnGUjvi7hO6rYc8ceVs.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
