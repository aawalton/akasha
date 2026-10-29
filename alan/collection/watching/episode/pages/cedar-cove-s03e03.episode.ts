import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cedarCoveS03e03 = {
  id: "01a18844-02b6-7f0c-a851-b2b29672b6da",
  type: "page-type/episode",
  slug: "cedar-cove-s03e03",
  description:
    "Jack gives Olivia space in the wake of their quarrel. Meanwhile, Justine partners with a rival and a picture proves to be very revealing.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/cedar-cove-season-3"],
  position: 3,
  publishedAt: "2015-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1089374",
      externalLink: "https://www.themoviedb.org/tv/47320/season/3/episode/3",
    },
  ],
  title: "Something's Gotta Give",
  episodeType: "standard",
  stillPath: "/zWIKwHDQvAUDBvabNbZTlpSMVI2.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:25:20.948Z",
  updatedAt: "2026-10-29T15:25:20.948Z",
} as const satisfies Episode
