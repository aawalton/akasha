import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekLowerDecksS05e10 = {
  id: "01a18852-f34c-7dae-ad7c-f7eeba3350b8",
  type: "page-type/episode",
  slug: "star-trek-lower-decks-s05e10",
  description: "Season finale where lots of wild stuff happens!",
  ownLength: 34,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-lower-decks-season-5"],
  position: 10,
  publishedAt: "2024-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5501769",
      externalLink: "https://www.themoviedb.org/tv/85948/season/5/episode/10",
    },
  ],
  title: "The New Next Generation (2)",
  episodeType: "finale",
  stillPath: "/1gCainIaYfxn7Sh3cGljmj0wwvV.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:41:40.042Z",
  updatedAt: "2026-10-29T15:41:40.042Z",
} as const satisfies Episode
