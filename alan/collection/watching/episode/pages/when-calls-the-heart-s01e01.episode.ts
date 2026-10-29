import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whenCallsTheHeartS01e01 = {
  id: "01a18859-d1b9-74f7-9f72-5d44fd79d996",
  type: "page-type/episode",
  slug: "when-calls-the-heart-s01e01",
  description:
    "As Elizabeth nervously faces her first day of teaching, Jack must figure out which doomed miner wrote a personal message on a plank found in the mine.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/when-calls-the-heart-season-1"],
  position: 1,
  publishedAt: "2014-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1034922",
      externalLink: "https://www.themoviedb.org/tv/61865/season/1/episode/1",
    },
  ],
  title: "Lost and Found",
  episodeType: "standard",
  stillPath: "/eZcnMmIdADOpmKhWPHole2Gxmhv.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:49:10.201Z",
  updatedAt: "2026-10-29T15:49:10.201Z",
} as const satisfies Episode
