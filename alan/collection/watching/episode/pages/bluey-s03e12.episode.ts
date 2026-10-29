import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS03e12 = {
  id: "01a18843-d154-714c-ab2a-ac7f8ccb1b6d",
  type: "page-type/episode",
  slug: "bluey-s03e12",
  description:
    "Dad agrees to play Sheepdog with Bluey and Bingo to stop them from disturbing Mum who is taking a well-earned rest. But looking after a sheep is harder work than they expected.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-3"],
  position: 12,
  publishedAt: "2021-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3366773",
      externalLink: "https://www.themoviedb.org/tv/82728/season/3/episode/12",
    },
  ],
  title: "Sheep Dog",
  episodeType: "standard",
  stillPath: "/2dSf8aGyAzHgCYtZeAxOlgABFSc.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
