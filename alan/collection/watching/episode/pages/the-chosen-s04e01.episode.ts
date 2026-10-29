import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS04e01 = {
  id: "01a18856-986b-7d8b-b516-16f28c53ec44",
  type: "page-type/episode",
  slug: "the-chosen-s04e01",
  description:
    "An intoxicating dance leads Herod to put an end to John the Baptizer, but no one can stop what-or Who-he's ushered in.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-4"],
  position: 1,
  publishedAt: "2024-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4828945",
      externalLink: "https://www.themoviedb.org/tv/85077/season/4/episode/1",
    },
  ],
  title: "Promises",
  episodeType: "standard",
  stillPath: "/eC8TSh6RYeyLsK46Io18mt5WxAG.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
