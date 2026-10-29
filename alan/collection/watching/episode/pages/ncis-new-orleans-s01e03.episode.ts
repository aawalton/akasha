import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS01e03 = {
  id: "01a1884b-3014-715c-a63f-4607395bcd8d",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s01e03",
  description:
    "An armored transport bus with Naval brig detainees on board crashes and four prisoners manage to escape.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-1"],
  position: 3,
  publishedAt: "2014-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010686",
      externalLink: "https://www.themoviedb.org/tv/61387/season/1/episode/3",
    },
  ],
  title: "Breaking Brig",
  episodeType: "standard",
  stillPath: "/zuJiRJU0ROmIgqWka0EG0MhqDy.jpg",
  voteAverage: 5.7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
