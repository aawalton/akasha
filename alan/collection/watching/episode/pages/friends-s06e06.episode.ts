import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS06e06 = {
  id: "01a18848-c2c1-7e57-be3e-3f692da43db2",
  type: "page-type/episode",
  slug: "friends-s06e06",
  description:
    "On the last night before Chandler and Monica move in together, Monica and Rachel argue, while Chandler tries to give Joey money to help him pay the upcoming bills.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-6"],
  position: 6,
  publishedAt: "1999-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86818",
      externalLink: "https://www.themoviedb.org/tv/1668/season/6/episode/6",
    },
  ],
  title: "The One on the Last Night",
  episodeType: "standard",
  stillPath: "/8nNQPYtxDjMmtlJie8LLtzYu5gU.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
