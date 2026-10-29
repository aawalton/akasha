import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS06e01 = {
  id: "01a18848-c2c0-748c-99b7-3f20908721fe",
  type: "page-type/episode",
  slug: "friends-s06e01",
  description:
    "Ross and Rachel experience the world’s worst hangover when they realize they’ve gotten married.  Chandler and Monica back away from their own altar plans.  Phoebe and Joey head back to New York in the taxi cab.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-6"],
  position: 1,
  publishedAt: "1999-09-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86757",
      externalLink: "https://www.themoviedb.org/tv/1668/season/6/episode/1",
    },
  ],
  title: "The One After Vegas",
  episodeType: "standard",
  stillPath: "/2T3D3y98XDM2owdjxcj8PEiQFP8.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
