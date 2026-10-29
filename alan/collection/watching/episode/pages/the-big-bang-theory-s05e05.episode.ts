import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS05e05 = {
  id: "01a18856-4002-7aa9-9d17-d9ff1e1c87be",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s05e05",
  description:
    "Sheldon and Leonard get invited to a party at Wil Wheaton's house, and Howard gets an out-of-this-world opportunity.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-5"],
  position: 5,
  publishedAt: "2011-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64723",
      externalLink: "https://www.themoviedb.org/tv/1418/season/5/episode/5",
    },
  ],
  title: "The Russian Rocket Reaction",
  episodeType: "standard",
  stillPath: "/pB5Ia00Um7dbybAUhWQTCV18V4z.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
