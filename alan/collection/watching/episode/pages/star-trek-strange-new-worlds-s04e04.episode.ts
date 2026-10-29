import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekStrangeNewWorldsS04e04 = {
  id: "01a18853-4347-79da-a968-a41e05e2699d",
  type: "page-type/episode",
  slug: "star-trek-strange-new-worlds-s04e04",
  description: "Una is mistaken for a virtuous kingpin against a Klingon occupation.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-strange-new-worlds-season-4"],
  position: 4,
  publishedAt: "2026-08-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7193798",
      externalLink: "https://www.themoviedb.org/tv/103516/season/4/episode/4",
    },
  ],
  title: "A Case of Chiaroscuro",
  episodeType: "standard",
  stillPath: "/kAggRfHzsWUlaev0bAemIxEBHQg.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:00.517Z",
  updatedAt: "2026-10-29T15:42:00.517Z",
} as const satisfies Episode
