import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whenCallsTheHeartS02e02 = {
  id: "01a18859-d1ba-7ceb-85c3-228e6f72f62a",
  type: "page-type/episode",
  slug: "when-calls-the-heart-s02e02",
  description:
    "Elizabeth and Jack remain worlds apart and Abigail finds out the devastating truth about Bill Avery.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/when-calls-the-heart-season-2"],
  position: 2,
  publishedAt: "2015-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1035070",
      externalLink: "https://www.themoviedb.org/tv/61865/season/2/episode/2",
    },
  ],
  title: "Heart and Soul",
  episodeType: "standard",
  stillPath: "/3bPrqAB1EoZROCJSQvSAkF2Ste1.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:49:10.201Z",
  updatedAt: "2026-10-29T15:49:10.201Z",
} as const satisfies Episode
