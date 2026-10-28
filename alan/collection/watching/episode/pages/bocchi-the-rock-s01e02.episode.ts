import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bocchiTheRockS01e02 = {
  id: "01a183d9-6b67-7ff2-96bd-96fa66b06966",
  type: "page-type/episode",
  slug: "bocchi-the-rock-s01e02",
  description:
    "Nijika proposes that the band save up money for their next gig by doing part-time work at Starry.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bocchi-the-rock-season-1"],
  position: 2,
  publishedAt: "2022-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3989993",
      externalLink: "https://www.themoviedb.org/tv/119100/season/1/episode/2",
    },
  ],
  title: "See You Tomorrow",
  episodeType: "standard",
  stillPath: "/cI5fIuAqxZuzSEvwIPuZC4UiYqA.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:50:26.535Z",
  updatedAt: "2026-10-28T18:50:26.535Z",
} as const satisfies Episode
