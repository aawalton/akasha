import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whenCallsTheHeartS08e01 = {
  id: "01a18859-d1bd-7d0d-8992-c5e4bacd8a41",
  type: "page-type/episode",
  slug: "when-calls-the-heart-s08e01",
  description:
    "Elizabeth tries to deal with how she feels about Nathan and Lucas; a visitor causes trouble.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/when-calls-the-heart-season-8"],
  position: 1,
  publishedAt: "2021-02-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2566400",
      externalLink: "https://www.themoviedb.org/tv/61865/season/8/episode/1",
    },
  ],
  title: "Open Season",
  episodeType: "standard",
  stillPath: "/g16j8gOx17ylUFaRbPEebibESb0.jpg",
  voteAverage: 5,
  createdAt: "2026-10-29T15:49:10.201Z",
  updatedAt: "2026-10-29T15:49:10.201Z",
} as const satisfies Episode
